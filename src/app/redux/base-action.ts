export interface BaseActionType {
  LOAD_INIT: string;
  SUCCESS_INIT: string;
  ERROR_INIT: string;

  LOAD_CREATE: string;
  SUCCESS_CREATE: string;
  ERROR_CREATE: string;

  LOAD_UPDATE: string;
  SUCCESS_UPDATE: string;
  ERROR_UPDATE: string;

  LOAD_DELETE: string;
  SUCCESS_DELETE: string;
  ERROR_DELETE: string;
}

export function getBaseActions(name: string) {
  return {
    LOAD_INIT: `[${name.toLowerCase()}] Load init`,
    SUCCESS_INIT: `[${name.toLowerCase()}] success init`,
    ERROR_INIT: `[${name.toLowerCase()}] error init`,

    LOAD_CREATE: `[${name.toLowerCase()}] load create`,
    SUCCESS_CREATE: `[${name.toLowerCase()}] successs create`,
    ERROR_CREATE: `[${name.toLowerCase()}] error create`,

    LOAD_UPDATE: `[${name.toLowerCase()}] load update`,
    SUCCESS_UPDATE: `[${name.toLowerCase()}] success update`,
    ERROR_UPDATE: `[${name.toLowerCase()}] error update`,

    LOAD_DELETE: `[${name.toLowerCase()}] load delete`,
    SUCCESS_DELETE: `[${name.toLowerCase()}] success delete`,
    ERROR_DELETE: `[${name.toLowerCase()}] error delete`,
  };
}
