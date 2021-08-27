import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '@Redux/core.state';
import { HandleDispatch } from '@Redux/handle-dispatch';
import { TodoListActions } from '@Redux/todolist/todolist.action';
import {
  selectSelectedTodo,
  selectTodoOperation,
  selectTodosStatus,
} from '@Redux/todolist/todolist.selector';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-select-todo',
  templateUrl: './select-todo.component.html',
  styleUrls: ['./select-todo.component.scss'],
})
export class SelectTodoComponent implements OnInit {
  selectedTodo$: Observable<Todo | undefined>;
  selectedTodo: Todo | undefined;

  todoForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    formBuilder: FormBuilder,
    private todoListActions: TodoListActions
  ) {
    this.selectedTodo$ = this.store.pipe(
      select(selectSelectedTodo),
      tap((s: Todo | undefined) => (this.selectedTodo = s))
    );

    this.selectedTodo$.subscribe();

    this.todoForm = formBuilder.group({
      title: '',
      completed: false,
    });
  }

  ngOnInit(): void {
    if (this.selectedTodo) {
      this.todoForm.patchValue({
        title: this.selectedTodo.title,
        completed: this.selectedTodo.completed,
      });
    }
  }

  async update(formValues: any): Promise<void> {
    const payload = { ...this.selectedTodo, ...formValues };
    try {
      const edited = await HandleDispatch.load(
        this.store,
        [this.todoListActions.editLoad, { single: payload }],
        selectTodoOperation,
        selectTodosStatus
      ).done();
      console.log('Edited: ', edited);
      this.router.navigateByUrl('/todolist');
    } catch (error) {
      console.log('Error occured while editing', error);
    }
  }
}
