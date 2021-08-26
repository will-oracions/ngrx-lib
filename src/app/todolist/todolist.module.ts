import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistRoutingModule } from './todolist-routing.module';
import { AllTodosComponent } from './all-todos/all-todos.component';
import { SelectTodoComponent } from './select-todo/select-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AllTodosComponent, SelectTodoComponent],
  imports: [
    CommonModule,
    TodolistRoutingModule,

    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodolistModule {}
