import { ToDo } from './../models/toDo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ToDo> {
    return this.http.get<ToDo>(this.apiUrl);
  }

  createToDo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, todo);
  }

  deleteToDo(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateToDo(todo: ToDo): Observable<ToDo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.patch<ToDo>(url, todo);
  }

}
