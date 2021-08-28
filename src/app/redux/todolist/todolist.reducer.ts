import { createReducer, on, Action } from '@ngrx/store';
import { BaseReducer, BaseState } from '@Redux/base-reducer';
import { Todo } from '../../models/todo.model';
import { TodoListActions } from './todolist.action';

export interface TodoListState extends BaseState {
  Timestamp?: number;
  List: Todo[];
  Status: {
    Loading: boolean;
    Success: boolean;
  };
  Selected?: Todo;
  Operation?: any;
}

const todoListActions = new TodoListActions();

const _selectTodo = (state: TodoListState, todo: Todo): TodoListState => ({
  ...state,
  Selected: todo,
});

export class TodoReducer extends BaseReducer {
  initialState: TodoListState = {
    Timestamp: undefined,
    List: [],
    Status: {
      Loading: false,
      Success: false,
    },
    Selected: undefined,
  };

  reducer: Function;

  constructor() {
    super(todoListActions);

    this.reducer = createReducer(
      this.initialState,
      ...this.getBaseProcess(),
      on(todoListActions.selectTodo, (state, { todo }) =>
        _selectTodo(state, todo)
      )
    );
  }
}
export function TodoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  const r = new TodoReducer();
  return r.reducer(state, action);
}
