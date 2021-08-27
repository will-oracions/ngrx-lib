import { Injectable } from '@angular/core';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Actions } from '@ngrx/effects';

import { Todo } from 'src/app/models/todo.model';
import { TodoListActions } from './todolist.action';
import { BaseEffect } from '@Redux/base-effect';

@Injectable()
export class TodoListEffect extends BaseEffect<Todo> {
  constructor(
    actions$: Actions,
    todoListService: TodoListService,
    todoListActions: TodoListActions
  ) {
    super(actions$, todoListService, todoListActions);
  }
}
