import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListService extends BaseHttpService<Todo> {
  rootUrl = `${environment.api}/todos`;

  constructor(http: HttpClient) {
    super(http);
  }

  create(todo: Todo): Observable<Todo> {
    console.log(todo);
    return this.http.post<Todo>(this.rootUrl, todo);
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.rootUrl);
  }

  edit(partialTodo: Partial<Todo>, id: number | undefined): Observable<Todo> {
    return this.http.patch<Todo>(`${this.rootUrl}/${id}`, partialTodo);
  }

  delete(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.rootUrl}/${id}`)
      .pipe(map((response) => id));
  }
}
