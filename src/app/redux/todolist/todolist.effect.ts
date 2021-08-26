import { Injectable } from '@angular/core';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  actionTodoListCreateError,
  actionTodoListCreateSuccess,
  actionTodoListDeleteError,
  actionTodoListDeleteLoad,
  actionTodoListDeleteSuccess,
  actionTodoListInitError,
  actionTodoListInitLoad,
  actionTodoListInitSuccess,
  actionTodoLIstUpdateError,
  actionTodoListUpdateLoad,
  actionTodoListUpdateSuccess,
  ActionTypes,
} from './todolist.action';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';

@Injectable()
export class TodoListEffect {
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todo: Todo }>(ActionTypes.LOAD_CREATE),
      switchMap((action) => this.todoListService.create(action.todo)),
      map((todo: Todo) => actionTodoListCreateSuccess({ todo })),
      catchError(() => of(actionTodoListCreateError()))
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todos: Todo[] }>(actionTodoListInitLoad),
      switchMap((action) => this.todoListService.getAll()),
      map((todos: Todo[]) => actionTodoListInitSuccess({ todos })),
      catchError(() => of(actionTodoListInitError()))
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; todo: Todo }>(actionTodoListUpdateLoad),
      switchMap((action) => {
        const { id, ...changes } = action.todo;
        return this.todoListService.edit(changes, id);
      }),
      map((todo: Todo) => actionTodoListUpdateSuccess({ todo })),
      catchError(() => of(actionTodoLIstUpdateError()))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{ type: string; id: number }>(actionTodoListDeleteLoad),
      switchMap((action) => this.todoListService.delete(action.id)),
      map((id: number) => actionTodoListDeleteSuccess({ id })),
      catchError(() => of(actionTodoListDeleteError()))
    )
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService
  ) {}
}
