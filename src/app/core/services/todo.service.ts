import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TodoModel} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private readonly _apiUrl = `${environment.apiUrl}/todo/`;

    constructor(private readonly _http: HttpClient) {
    }

    retrieveTodos(): Observable<TodoModel[]> {
        return this._http.get<TodoModel[]>(this._apiUrl);
    }

    retrieveTodoById(id: string): Observable<TodoModel> {
        return this._http.get<TodoModel>(`${this._apiUrl}${id}/`);
    }

    createTodo(todo: Omit<TodoModel, 'id'>): Observable<TodoModel> {
        return this._http.post<TodoModel>(this._apiUrl, todo);
    }

    updateTodo(id: string, todo: Partial<TodoModel>): Observable<TodoModel> {
        return this._http.put<TodoModel>(`${this._apiUrl}${id}/`, todo);
    }

    removeTodo(id: string): Observable<void> {
        return this._http.delete<void>(`${this._apiUrl}${id}/`);
    }
}