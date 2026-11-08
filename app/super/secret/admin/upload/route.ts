import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, getStorage, getUploadMode, randomId } from "@/lib/storage";

const FOLDERS = ["cars/", "gallery/"];

function allowedPathname(pathname: string) {
  return (
    FOLDERS.some((f) => pathname.startsWith(f)) &&
    !pathname.includes("..") &&
    /^[a-z0-9/_.-]+\.(jpg|jpeg|png|webp|avif|gif)$/i.test(pathname)
  );
}

/**
 * Image uploads for the admin panel.
 *
 * - JSON body → Vercel Blob client-upload handshake (`@vercel/blob/client` `upload()` asks us for a
 *   short-lived client token; the browser then uploads straight to Blob). Needs BLOB_READ_WRITE_TOKEN.
 * - multipart/form-data → the file is uploaded through this function (local dev, or Blob via OIDC).
 */
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    if (getUploadMode() !== "client") {
      return NextResponse.json({ error: "Client uploads need BLOB_READ_WRITE_TOKEN" }, { status: 400 });
    }
    let body: HandleUploadBody;
    try {
      body = (await request.json()) as HandleUploadBody;
    } catch {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    if (body.type !== "blob.generate-client-token") {
      // We don't use upload-completed callbacks: the browser reports results via a Server Action.
      return NextResponse.json({ error: "Unsupported event" }, { status: 400 });
    }
    try {
      const result = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (pathname) => {
          if (!allowedPathname(pathname)) throw new Error("Недопустимое имя файла");
          return {
            allowedContentTypes: ALLOWED_IMAGE_TYPES,
            maximumSizeInBytes: MAX_IMAGE_BYTES,
            addRandomSuffix: true,
            cacheControlMaxAge: 60 * 60 * 24 * 365,
            validUntil: Date.now() + 10 * 60 * 1000,
          };
        },
      });
      return NextResponse.json(result);
    } catch (err) {
      console.error("[upload] token generation failed", err);
      return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 400 });
    }
  }

  // Server-side upload (multipart form).
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const file = form.get("file");
  const pathname = form.get("pathname");
  if (!(file instanceof File) || typeof pathname !== "string" || !allowedPathname(pathname)) {
    return NextResponse.json({ error: "Некорректный файл" }, { status: 400 });
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Поддерживаются JPG, PNG, WebP, AVIF и GIF" }, { status: 400 });
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "Файл слишком большой" }, { status: 400 });
  }

  try {
    const dot = pathname.lastIndexOf(".");
    const unique = `${pathname.slice(0, dot)}-${randomId(10)}${pathname.slice(dot)}`;
    const stored = await getStorage().put(unique, file, { contentType: file.type });
    return NextResponse.json({ url: stored.url });
  } catch (err) {
    console.error("[upload] server upload failed", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 500 });
  }
}
