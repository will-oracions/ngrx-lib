import { ActionReducerMap } from '@ngrx/store';
import { TodoListReducer, TodoListState } from './todolist/todolist.reducer';

export interface AppState {
  Todos: TodoListState;
}

export const reducers: ActionReducerMap<AppState> = {
  Todos: TodoListReducer,
};
