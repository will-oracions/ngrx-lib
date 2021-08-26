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
      ofType<{ type: string; todo: Todo }>(this.todoListActions.createLoad),
      switchMap((action) => this.todoListService.create(action.todo)),
      map((todo: Todo) => this.todoListActions.createSuccess({ todo })),
      catchError(() => of(this.todoListActions.createError()))
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todos: Todo[] }>(this.todoListActions.initLoad),
      switchMap((action) => this.todoListService.getAll()),
      map((todos: Todo[]) => this.todoListActions.initSuccess({ todos })),
      catchError(() => of(this.todoListActions.initError()))
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todo: Todo }>(this.todoListActions.editLoad),
      switchMap((action) => {
        const { id, ...changes } = action.todo;
        return this.todoListService.edit(changes, id);
      }),
      map((todo: Todo) => this.todoListActions.editSuccess({ todo })),
      catchError(() => of(this.todoListActions.editError()))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; id: number }>(this.todoListActions.deleteLoad),
      switchMap((action) => this.todoListService.delete(action.id)),
      map((id: number) => this.todoListActions.deleteSuccess({ id })),
      catchError(() => of(this.todoListActions.deleteError()))
    )
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService,
    private todoListActions: TodoListActions
  ) {}
}
