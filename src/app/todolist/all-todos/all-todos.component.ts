import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  selectTodoOperation,
  selectTodos,
  selectTodosStatus,
} from '@Redux/todolist/todolist.selector';
import { Observable } from 'rxjs';

import { Todo } from 'src/app/models/todo.model';
import { AppState } from 'src/app/redux/core.state';

import { HandleDispatch } from '@Redux/handle-dispatch';
import { Router } from '@angular/router';
import { TodoListActions } from '@Redux/todolist/todolist.action';

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
    private todoListActions: TodoListActions
  ) {
    this.todoForm = formBuilder.group({
      title: [''],
      completed: [false],
    });
    this.loading = false;

    this.todos$ = this.store.pipe(select(selectTodos));
  }

  async ngOnInit(): Promise<void> {
    try {
      const todos = await HandleDispatch.load(
        this.store,
        this.todoListActions.initLoad,
        selectTodos,
        selectTodosStatus
      ).done();
      // console.log('My request: ', todos);
    } catch (error) {
      console.log('Error: ', error);
    }

    this.initTodos();
    // this.todoloading$.subscribe((loading) => (this.loading = loading));
  }

  private initTodos(): void {
    // this.todosLoaded$.subscribe((loaded: boolean) => {
    //   // console.log('Loaded: ', loaded);
    //   if (!loaded) {
    //     // console.log('Aller Hoop, on récupère :)');
    // this.store.dispatch(actionTodoListInitLoad());
    //   }
    // });
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
        selectTodoOperation,
        selectTodosStatus
      ).done();
      console.log('Saved: ', saved);
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
        selectTodoOperation,
        selectTodosStatus
      ).done();
      console.log('Delete: ', deleted);
    } catch (error) {
      console.log('Error ocurred while delete');
    }
  }
}
