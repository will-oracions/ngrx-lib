import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService<TModel> {
  r = `environment.api/TModels`;

  constructor(protected http: HttpClient) {}

  create(TModel: TModel): Observable<TModel> {
    console.log(TModel);
    return this.http.post<TModel>(this.r, TModel);
  }

  getAll(): Observable<TModel[]> {
    return this.http.get<TModel[]>(this.r);
  }

  edit(
    partialTModel: Partial<TModel>,
    id: number | undefined
  ): Observable<TModel> {
    return this.http.patch<TModel>(`${this.r}/${id}`, partialTModel);
  }

  delete(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.r}/${id}`)
      .pipe(map((response) => id));
  }
}
