import { createSelector } from '@ngrx/store';
import { TodoListService } from 'src/app/services/todo-list.service';

import { AppState } from '../core.state';
import { TodoListState } from './todolist.reducer';

export const selectTodoListState$ = (state: AppState) => state.Todos;

export const selectTodos = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.List
);

export const selectSelectedTodo = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.Selected
);

export const selectTodosStatus = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.Status
);

export const selectTodoOperation = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.Operation
);

export const selectTodoSelected = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.Selected
);

export const selectTimestamps = createSelector(
  selectTodoListState$,
  (state: TodoListState) => state.Timestamps
);

// export const selectTodosLoaded = createSelector(
//   selectTodoListState$,
//   (state: TodoListState) => state.loaded
// );
