import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Todo } from 'src/app/models/todo.model';
import { AppState } from 'src/app/redux/core.state';

import { HandleDispatch } from '@Redux/handle-dispatch';
import { Router } from '@angular/router';
import { TodoListActions } from '@Redux/todolist/todolist.action';
import { TodoListSelectors } from '@Redux/todolist/todolist.selector';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss'],
})
export class AllTodosComponent implements OnInit {
  todoForm: FormGroup;

  loading: boolean;

  todos$: Observable<Todo[]>;

  constructor(
    private store: Store<AppState>,
    formBuilder: FormBuilder,
    private router: Router,
    private todoListActions: TodoListActions,
    private todoListSelector: TodoListSelectors
  ) {
    this.todoForm = formBuilder.group({
      title: [''],
      completed: [false],
    });
    this.loading = false;

    this.todos$ = this.store.pipe(select(this.todoListSelector.selectList));
  }

  async ngOnInit(): Promise<void> {
    try {
      const todos = await HandleDispatch.load(
        this.store,
        this.todoListActions.initLoad,
        this.todoListSelector.selectList,
        this.todoListSelector.selectStatus,
        this.todoListSelector.selectTimestamp
      ).done(true);
      // console.log('My request: ', todos);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async create(data: any): Promise<void> {
    //
    // console.log(data);
    const newTodo = new Todo(data.title, data.completed);
    // this.store.dispatch(actionTodoListCreateLoad({ todo: newTodo }));
    try {
      const saved = await HandleDispatch.load(
        this.store,
        [this.todoListActions.createLoad, { single: newTodo }],
        this.todoListSelector.selectOperation,
        this.todoListSelector.selectStatus
      ).done();
      // console.log('Saved: ', saved);
    } catch (error) {
      console.log('Error while creating !');
    }
    this.todoForm.reset();
  }

  edit(todo: Todo): void {
    this.store.dispatch(this.todoListActions.selectTodo({ todo }));
    this.router.navigateByUrl('/todolist/select');
  }

  async delete(todo: Todo): Promise<void> {
    // this.store.dispatch(actionTodoListDeleteLoad({ id: todo.id }));
    try {
      const deleted = await HandleDispatch.load(
        this.store,
        [this.todoListActions.deleteLoad, { id: todo.id }],
        this.todoListSelector.selectOperation,
        this.todoListSelector.selectStatus
      ).done();
      // console.log('Delete: ', deleted);
    } catch (error) {
      console.log('Error ocurred while delete');
    }
  }
}
