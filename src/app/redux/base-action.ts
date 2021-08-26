import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export interface BaseActionsType {
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

export class BaseActions {
  constructor(private actionsType: BaseActionsType) {}
  // Init
  initLoad = createAction(this.actionsType.LOAD_INIT);
  initSuccess = createAction(
    this.actionsType.SUCCESS_INIT,
    props<{ todos: Todo[] }>()
  );
  initError = createAction(this.actionsType.ERROR_INIT);

  // Create
  createLoad = createAction(
    this.actionsType.LOAD_CREATE,
    props<{ todo: Todo }>()
  );
  createSuccess = createAction(
    this.actionsType.SUCCESS_CREATE,
    props<{ todo: Todo }>()
  );
  createError = createAction(this.actionsType.ERROR_CREATE);

  // Edit
  editLoad = createAction(
    this.actionsType.LOAD_UPDATE,
    props<{ todo: Todo }>()
  );
  editSuccess = createAction(
    this.actionsType.SUCCESS_UPDATE,
    props<{ todo: Todo }>()
  );
  editError = createAction(this.actionsType.ERROR_UPDATE);

  // Delete
  deleteLoad = createAction(
    this.actionsType.LOAD_DELETE,
    props<{ id?: number }>()
  );
  deleteSuccess = createAction(
    this.actionsType.SUCCESS_DELETE,
    props<{ id: number }>()
  );
  deleteError = createAction(this.actionsType.ERROR_DELETE);
}
