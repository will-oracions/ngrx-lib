import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const ActionTypes = {
  LOAD_INIT: '[todolist] Load init',
  SUCCESS_INIT: '[todolist] success init',
  ERROR_INIT: '[todolist] error init',

  LOAD_CREATE: '[todolist] load create',
  SUCCESS_CREATE: '[todolist] successs create',
  ERROR_CREATE: '[todolist] error create',

  LOAD_UPDATE: '[todolist] load update',
  SUCCESS_UPDATE: '[todolist] success update',
  ERROR_UPDATE: '[todolist] error update',

  LOAD_DELETE: '[todolist] load delete',
  SUCCESS_DELETE: '[todolist] success delete',
  ERROR_DELETE: '[todolist] error delete',

  SELECT: '[todolist]  selecte',
};

export const actionTodoListSelectTodo = createAction(
  ActionTypes.SELECT,
  props<{ todo: Todo }>()
);

// Init
export const actionTodoListInitLoad = createAction(ActionTypes.LOAD_INIT);
export const actionTodoListInitSuccess = createAction(
  ActionTypes.SUCCESS_INIT,
  props<{ todos: Todo[] }>()
);
export const actionTodoListInitError = createAction(ActionTypes.ERROR_INIT);

// Create
export const actionTodoListCreateLoad = createAction(
  ActionTypes.LOAD_CREATE,
  props<{ todo: Todo }>()
);
export const actionTodoListCreateSuccess = createAction(
  ActionTypes.SUCCESS_CREATE,
  props<{ todo: Todo }>()
);
export const actionTodoListCreateError = createAction(ActionTypes.ERROR_CREATE);

// Edit
export const actionTodoListUpdateLoad = createAction(
  ActionTypes.LOAD_UPDATE,
  props<{ todo: Todo }>()
);
export const actionTodoListUpdateSuccess = createAction(
  ActionTypes.SUCCESS_UPDATE,
  props<{ todo: Todo }>()
);
export const actionTodoLIstUpdateError = createAction(ActionTypes.ERROR_UPDATE);

// Delete
export const actionTodoListDeleteLoad = createAction(
  ActionTypes.LOAD_DELETE,
  props<{ id?: number }>()
);
export const actionTodoListDeleteSuccess = createAction(
  ActionTypes.SUCCESS_DELETE,
  props<{ id: number }>()
);
export const actionTodoListDeleteError = createAction(ActionTypes.ERROR_DELETE);
