/** Admin panel URL constants (safe to import from Client Components). */
export const ADMIN_PATH = "/super/secret/admin";
export const ADMIN_LOGIN_PATH = `${ADMIN_PATH}/login`;
export const ADMIN_UPLOAD_PATH = `${ADMIN_PATH}/upload`;

export const adminRoutes = {
  home: ADMIN_PATH,
  login: ADMIN_LOGIN_PATH,
  cars: `${ADMIN_PATH}/cars`,
  newCar: `${ADMIN_PATH}/cars/new`,
  car: (slug: string) => `${ADMIN_PATH}/cars/${encodeURIComponent(slug)}`,
  gallery: `${ADMIN_PATH}/gallery`,
  album: (slug: string) => `${ADMIN_PATH}/gallery/${encodeURIComponent(slug)}`,
  videos: `${ADMIN_PATH}/videos`,
  leads: `${ADMIN_PATH}/leads`,
  lead: (id: string) => `${ADMIN_PATH}/leads/${encodeURIComponent(id)}`,
};
