import { Injectable } from '@angular/core';
import { createSelector } from '@ngrx/store';
import { BaseSelector } from '@Redux/base-selector';

import { AppState } from '../core.state';
import { TodoListState } from './todolist.reducer';

export const selectTodoListState$ = (state: AppState) => state.Todos;

@Injectable()
export class TodoListSelectors extends BaseSelector {
  constructor() {
    super(selectTodoListState$);

    this.selectTodoSelected = createSelector(
      selectTodoListState$,
      (state: TodoListState) => state.Selected
    );
  }

  public selectTodoSelected: any;
}
