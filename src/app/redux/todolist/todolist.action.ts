import { createAction, props } from '@ngrx/store';
import { BaseActionType, getBaseActions } from '@Redux/base-action';
import { Todo } from 'src/app/models/todo.model';

interface Types extends BaseActionType {
  SELECT: string;
}

export class TodoListActions {
  static ActionTypes: Types = {
    ...getBaseActions('todolist'),
    SELECT: '[todolist]  selecte',
  };

  static selectTodo = createAction(
    TodoListActions.ActionTypes.SELECT,
    props<{ todo: Todo }>()
  );

  // Init
  static initLoad = createAction(TodoListActions.ActionTypes.LOAD_INIT);
  static initSuccess = createAction(
    TodoListActions.ActionTypes.SUCCESS_INIT,
    props<{ todos: Todo[] }>()
  );
  static initError = createAction(TodoListActions.ActionTypes.ERROR_INIT);

  // Create
  static createLoad = createAction(
    TodoListActions.ActionTypes.LOAD_CREATE,
    props<{ todo: Todo }>()
  );
  static createSuccess = createAction(
    TodoListActions.ActionTypes.SUCCESS_CREATE,
    props<{ todo: Todo }>()
  );
  static createError = createAction(TodoListActions.ActionTypes.ERROR_CREATE);

  // Edit
  static editLoad = createAction(
    TodoListActions.ActionTypes.LOAD_UPDATE,
    props<{ todo: Todo }>()
  );
  static editSuccess = createAction(
    TodoListActions.ActionTypes.SUCCESS_UPDATE,
    props<{ todo: Todo }>()
  );
  static editError = createAction(TodoListActions.ActionTypes.ERROR_UPDATE);

  // Delete
  static deleteLoad = createAction(
    TodoListActions.ActionTypes.LOAD_DELETE,
    props<{ id?: number }>()
  );
  static deleteSuccess = createAction(
    TodoListActions.ActionTypes.SUCCESS_DELETE,
    props<{ id: number }>()
  );
  static deleteError = createAction(TodoListActions.ActionTypes.ERROR_DELETE);
}
