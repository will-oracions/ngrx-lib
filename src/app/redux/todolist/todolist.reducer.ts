import { createReducer, on, Action } from '@ngrx/store';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Todo } from '../../models/todo.model';
import {
  actionTodoListInitError,
  actionTodoListCreateError,
  actionTodoListInitSuccess,
  actionTodoListCreateLoad,
  actionTodoListInitLoad,
  actionTodoListCreateSuccess,
  actionTodoListDeleteLoad,
  actionTodoListDeleteSuccess,
  actionTodoListDeleteError,
  actionTodoListUpdateLoad,
  actionTodoListUpdateSuccess,
  actionTodoLIstUpdateError,
  actionTodoListSelectTodo,
} from './todolist.action';

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
  on(actionTodoListSelectTodo, (state, { todo }) => _selectTodo(state, todo)),
  // Init
  on(actionTodoListInitLoad, (state) => _loadInit(state)),
  on(actionTodoListInitSuccess, (state, { todos }) =>
    _successInit(state, todos)
  ),
  on(actionTodoListInitError, (state) => _errorInit(state)),

  // Create
  on(actionTodoListCreateLoad, (state, action) => _loadCreate(state)),
  on(actionTodoListCreateSuccess, (state, { todo }) =>
    _successCreate(state, todo)
  ),
  on(actionTodoListCreateError, (state, action) => _errorCreate(state)),

  // Delete
  on(actionTodoListDeleteLoad, (state) => _loadDelete(state)),
  on(actionTodoListDeleteSuccess, (state, { id }) => _successDelete(state, id)),
  on(actionTodoListDeleteError, (state) => _errorDelete(state)),

  // update
  on(actionTodoListUpdateLoad, (state) => _loadUpdate(state)),
  on(actionTodoListUpdateSuccess, (state, { todo }) =>
    _successUpdate(state, todo)
  ),
  on(actionTodoLIstUpdateError, (state) => _errorUpdate(state))
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
