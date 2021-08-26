import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTodosComponent } from './all-todos/all-todos.component';
import { SelectTodoComponent } from './select-todo/select-todo.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AllTodosComponent,
      },
      {
        path: 'select',
        component: SelectTodoComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistRoutingModule {}
