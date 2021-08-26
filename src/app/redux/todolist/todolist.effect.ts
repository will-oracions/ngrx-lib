import { Injectable } from '@angular/core';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoListActions } from './todolist.action';

@Injectable()
export class TodoListEffect {
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todo: Todo }>(TodoListActions.createLoad),
      switchMap((action) => this.todoListService.create(action.todo)),
      map((todo: Todo) => TodoListActions.createSuccess({ todo })),
      catchError(() => of(TodoListActions.createError()))
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todos: Todo[] }>(TodoListActions.initLoad),
      switchMap((action) => this.todoListService.getAll()),
      map((todos: Todo[]) => TodoListActions.initSuccess({ todos })),
      catchError(() => of(TodoListActions.initError()))
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todo: Todo }>(TodoListActions.editLoad),
      switchMap((action) => {
        const { id, ...changes } = action.todo;
        return this.todoListService.edit(changes, id);
      }),
      map((todo: Todo) => TodoListActions.editSuccess({ todo })),
      catchError(() => of(TodoListActions.editError()))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; id: number }>(TodoListActions.deleteLoad),
      switchMap((action) => this.todoListService.delete(action.id)),
      map((id: number) => TodoListActions.deleteSuccess({ id })),
      catchError(() => of(TodoListActions.deleteError()))
    )
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService
  ) {}
}
