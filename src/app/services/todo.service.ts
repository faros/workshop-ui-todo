import {Injectable} from '@angular/core';
import {Todo} from '../models/todo.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TodoService {

    constructor(private http: HttpClient) {
    }

    getTodos(): Observable<Array<Todo>> {
        return this.http.get<Array<Todo>>('/todos');
    }

    createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>('/todos', todo);
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`/todos/${todo.id}`, todo);
    }

    deleteTodo(todo: Todo): Observable<void> {
        return this.http.delete<void>(`/todos/${todo.id}`);
    }
}
