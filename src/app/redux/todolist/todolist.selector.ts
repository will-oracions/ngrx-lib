import { Todo } from 'src/app/models/todo.model';
import { createSelector, select } from '@ngrx/store';

import { AppState } from '../core.state';
import { TodoListState } from './todolist.reducer';

export const selectTodoListState$ = (state: AppState) => state.Todos;

export const selectTodos = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.todos
);

export const selectSelectedTodo = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.selected
);

export const selectTodosStatus = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.status
);

export const selectTodoOperation = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.operation
);

export const selectTodoSelected = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.selected
);

// export const selectTodosLoaded = createSelector(
//   selectTodoListState$,
//   (state: TodoListState) => state.loaded
// );
