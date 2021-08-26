import { createReducer, on, Action } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { TodoListActions } from './todolist.action';

export interface TodoListState {
  timestamps?: number;
  todos: Todo[];
  status: {
    loading: boolean;
    success: boolean;
  };
  selected?: Todo;
  operation?: any;
}

const initialState: TodoListState = {
  timestamps: undefined,
  todos: [],
  status: {
    loading: false,
    success: false,
  },
  selected: undefined,
};

const reducer = createReducer(
  initialState,
  on(TodoListActions.selectTodo, (state, { todo }) => _selectTodo(state, todo)),
  // Init
  on(TodoListActions.initLoad, (state) => _loadInit(state)),
  on(TodoListActions.initSuccess, (state, { todos }) =>
    _successInit(state, todos)
  ),
  on(TodoListActions.initError, (state) => _errorInit(state)),

  // Create
  on(TodoListActions.createLoad, (state, action) => _loadCreate(state)),
  on(TodoListActions.createSuccess, (state, { todo }) =>
    _successCreate(state, todo)
  ),
  on(TodoListActions.createError, (state, action) => _errorCreate(state)),

  // Delete
  on(TodoListActions.deleteLoad, (state) => _loadDelete(state)),
  on(TodoListActions.deleteSuccess, (state, { id }) =>
    _successDelete(state, id)
  ),
  on(TodoListActions.deleteError, (state) => _errorDelete(state)),

  // update
  on(TodoListActions.editLoad, (state) => _loadUpdate(state)),
  on(TodoListActions.editSuccess, (state, { todo }) =>
    _successUpdate(state, todo)
  ),
  on(TodoListActions.editError, (state) => _errorUpdate(state))
);

export function TodoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return reducer(state, action);
}

const _selectTodo = (state: TodoListState, todo: Todo): TodoListState => ({
  ...state,
  selected: todo,
});

// Update
const _loadUpdate = (state: TodoListState): TodoListState => ({
  ...state,
  status: { loading: true, success: false },
});
const _successUpdate = (state: TodoListState, todo: Todo) => ({
  ...state,
  status: { loading: false, success: true },
  todos: state.todos.map((t: Todo) => (t.id === todo.id ? todo : t)),
  operation: { edited: todo },
});
const _errorUpdate = (state: TodoListState) => ({
  ...state,
  status: { loading: false, success: false },
});

// Delete
const _loadDelete = (state: TodoListState): TodoListState => ({
  ...state,
  status: { loading: true, success: false },
});
const _successDelete = (state: TodoListState, id: number): TodoListState => ({
  ...state,
  status: { loading: false, success: true },
  todos: state.todos.filter((todo) => todo.id !== id),
  operation: { deleted: id },
});
const _errorDelete = (state: TodoListState): TodoListState => ({
  ...state,
  status: { loading: false, success: false },
});

// Create
const _loadCreate = (state: TodoListState) => ({
  ...state,
  status: { loading: true, success: false },
});
const _successCreate = (state: TodoListState, todo: Todo) => ({
  ...state,
  status: { loading: false, success: true },
  todos: [...state.todos, todo],
  operation: { created: todo },
});
const _errorCreate = (state: TodoListState) => ({
  ...state,
  status: { loading: false, success: false },
});

// Init
const _loadInit = (state: TodoListState): TodoListState => ({
  ...state,
  status: { loading: true, success: false },
});
const _successInit = (state: TodoListState, todos: Todo[]): TodoListState => ({
  ...state,
  status: { loading: false, success: true },
  todos: todos,
});
const _errorInit = (state: TodoListState): TodoListState => ({
  ...state,
  status: { loading: false, success: false },
});
