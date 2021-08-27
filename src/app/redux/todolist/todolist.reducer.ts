import { createReducer, on, Action } from '@ngrx/store';
import { BaseReducer, BaseState } from '@Redux/base-reducer';
import { Todo } from '../../models/todo.model';
import { TodoListActions } from './todolist.action';

export interface TodoListState extends BaseState {
  Timestamps?: number;
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
  // // Update
  // _loadUpdate = (state: TodoListState): TodoListState => ({
  //   ...state,
  //   status: { loading: true, success: false },
  // });
  // _successUpdate = (state: TodoListState, todo: Todo) => ({
  //   ...state,
  //   status: { loading: false, success: true },
  //   todos: state.todos.map((t: Todo) => (t.id === todo.id ? todo : t)),
  //   operation: { edited: todo },
  // });
  // _errorUpdate = (state: TodoListState) => ({
  //   ...state,
  //   status: { loading: false, success: false },
  // });

  // // Delete
  // _loadDelete = (state: TodoListState): TodoListState => ({
  //   ...state,
  //   status: { loading: true, success: false },
  // });
  // _successDelete = (state: TodoListState, id: number): TodoListState => ({
  //   ...state,
  //   status: { loading: false, success: true },
  //   todos: state.todos.filter((todo) => todo.id !== id),
  //   operation: { deleted: id },
  // });
  // _errorDelete = (state: TodoListState): TodoListState => ({
  //   ...state,
  //   status: { loading: false, success: false },
  // });

  // // Create
  // _loadCreate = (state: TodoListState) => ({
  //   ...state,
  //   status: { loading: true, success: false },
  // });
  // _successCreate = (state: TodoListState, todo: Todo) => ({
  //   ...state,
  //   status: { loading: false, success: true },
  //   todos: [...state.todos, todo],
  //   operation: { created: todo },
  // });
  // _errorCreate = (state: TodoListState) => ({
  //   ...state,
  //   status: { loading: false, success: false },
  // });

  // // Init
  // _loadInit = (state: TodoListState): TodoListState => ({
  //   ...state,
  //   status: { loading: true, success: false },
  // });
  // _successInit = (state: TodoListState, todos: Todo[]): TodoListState => ({
  //   ...state,
  //   status: { loading: false, success: true },
  //   todos: todos,
  // });
  // _errorInit = (state: TodoListState): TodoListState => ({
  //   ...state,
  //   status: { loading: false, success: false },
  // });

  initialState: TodoListState = {
    Timestamps: undefined,
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
      //   // Init
      //   on(todoListActions.initLoad, (state) => this._loadInit(state)),
      //   on(todoListActions.initSuccess, (state, { list }) =>
      //     this._successInit(state, list)
      //   ),
      //   on(todoListActions.initError, (state) => this._errorInit(state)),
      //   // Create
      //   on(todoListActions.createLoad, (state, action) =>
      //     this._loadCreate(state)
      //   ),
      //   on(todoListActions.createSuccess, (state, { single }) =>
      //     this._successCreate(state, single)
      //   ),
      //   on(todoListActions.createError, (state, action) =>
      //     this._errorCreate(state)
      //   ),
      //   // Delete
      //   on(todoListActions.deleteLoad, (state) => this._loadDelete(state)),
      //   on(todoListActions.deleteSuccess, (state, { id }) =>
      //     this._successDelete(state, id)
      //   ),
      //   on(todoListActions.deleteError, (state) => this._errorDelete(state)),
      //   // update
      //   on(todoListActions.editLoad, (state) => this._loadUpdate(state)),
      //   on(todoListActions.editSuccess, (state, { single }) =>
      //     this._successUpdate(state, single)
      //   ),
      //   on(todoListActions.editError, (state) => this._errorUpdate(state))
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
