/**
 * Photo gallery content.
 *
 * Photos live in `public/gallery/<album>/`. Each album is one real car we inspected
 * and bought in Korea. `kind` splits photos into the two gallery filters:
 *   - "car"      — exterior / beauty shots of the vehicle
 *   - "process"  — inspection details: mileage, VIN, paint, engine bay, etc.
 */

export type PhotoKind = "car" | "process";

export type GalleryPhoto = {
  src: string;
  alt: string;
  kind: PhotoKind;
  /** Intrinsic size, used for layout (portrait by default) */
  width: number;
  height: number;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  /** Short line under the title: mileage, year, where it was inspected */
  meta: string;
  photos: GalleryPhoto[];
};

export const galleryFilters: { id: "all" | PhotoKind; label: string }[] = [
  { id: "all", label: "Все фото" },
  { id: "car", label: "Автомобили" },
  { id: "process", label: "Процесс осмотра" },
];

type Raw = [file: string, kind: PhotoKind, alt: string, landscape?: true];

function album(slug: string, title: string, meta: string, raw: Raw[]): GalleryAlbum {
  return {
    slug,
    title,
    meta,
    photos: raw.map(([file, kind, alt, landscape]) => ({
      src: `/gallery/${slug}/${file}.jpg`,
      alt: `${title} — ${alt}`,
      kind,
      width: landscape ? 1280 : 960,
      height: landscape ? 960 : 1280,
    })),
  };
}

export const galleryAlbums: GalleryAlbum[] = [
  album("bmw-x6", "BMW X6 xDrive40i M Sport", "Пробег 27 065 км · осмотр и выкуп в Сеуле", [
    ["7506", "car", "вид спереди на парковке дилера"],
    ["7507", "process", "комплект ключей"],
    ["7508", "process", "заводская табличка с данными о шинах и давлении"],
    ["7509", "process", "приборная панель, пробег 27 065 км"],
    ["7510", "car", "вид спереди"],
    ["7511", "car", "капот и решётка радиатора"],
    ["7512", "car", "вид спереди справа"],
    ["7513", "car", "вид сбоку сзади"],
    ["7514", "car", "вид спереди слева"],
    ["7515", "car", "передняя часть, вид справа"],
    ["7516", "car", "вид сбоку слева", true],
    ["7517", "car", "вид сбоку справа", true],
    ["7518", "car", "вид сзади"],
    ["7519", "car", "задняя часть, вид сверху"],
    ["7520", "car", "вид сзади слева"],
    ["7521", "car", "вид сзади справа"],
    ["7522", "car", "задний фонарь и крыло"],
    ["7523", "car", "вид сбоку сзади справа"],
    ["7524", "process", "боковое зеркало, проверка состояния"],
    ["7525", "process", "правое зеркало крупным планом"],
    ["7526", "process", "левое зеркало крупным планом"],
    ["7527", "process", "корпус зеркала, проверка лакокрасочного покрытия"],
    ["7528", "car", "решётка радиатора и эмблема"],
    ["7529", "car", "задняя эмблема и шильдик"],
    ["7530", "process", "лобовое стекло и крыша"],
    ["7531", "process", "крыша и стойки, проверка ЛКП"],
    ["7532", "process", "крыша, отражения для оценки геометрии"],
    ["7533", "process", "передняя фара, состояние оптики"],
    ["7534", "process", "фара и крыло, зазоры"],
    ["7535", "process", "задний фонарь, состояние"],
    ["7536", "process", "задний фонарь и бампер, зазоры"],
    ["7537", "process", "лючок топливного бака"],
    ["7538", "process", "торец двери и проём"],
    ["7539", "process", "порог и нижняя кромка двери"],
    ["7540", "process", "открытый капот, общий вид моторного отсека"],
    ["7541", "process", "информационная наклейка под капотом"],
    ["7542", "process", "шумоизоляция капота"],
    ["7543", "process", "декоративная крышка двигателя"],
    ["7544", "process", "моторный отсек, навесное оборудование"],
    ["7545", "process", "распорка и бачок, моторный отсек"],
    ["7546", "process", "расширительный бачок охлаждающей жидкости"],
    ["7547", "process", "двигатель, топливная система"],
    ["7548", "process", "двигатель, насос и магистрали"],
    ["7549", "process", "выпускной тракт и теплозащита"],
    ["7550", "process", "блок предохранителей и бачок тормозной жидкости"],
    ["7551", "process", "патрубки и проводка в моторном отсеке"],
    ["7552", "process", "VIN-табличка на кузове"],
    ["7553", "process", "узел двигателя крупным планом"],
    ["7554", "process", "масляный фильтр"],
    ["7555", "process", "разъёмы и датчики двигателя"],
  ]),
];

export const galleryPhotos: (GalleryPhoto & { album: string })[] = galleryAlbums.flatMap((a) =>
  a.photos.map((p) => ({ ...p, album: a.title })),
);
