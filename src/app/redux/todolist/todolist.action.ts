import { createAction, props } from '@ngrx/store';
import {
  BaseActions,
  BaseActionsType,
  getBaseActions,
} from '@Redux/base-action';
import { Todo } from 'src/app/models/todo.model';

interface Types extends BaseActionsType {
  SELECT: string;
}

const actionTypes: Types = {
  ...getBaseActions('todolist'),
  SELECT: '[todolist]  select',
};

export class TodoListActions extends BaseActions {
  private actionTypes: Types = actionTypes;

  selectTodo = createAction(this.actionTypes.SELECT, props<{ todo: Todo }>());

  constructor() {
    super(actionTypes);
  }
}
