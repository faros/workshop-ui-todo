import {BehaviorSubject, Observable} from 'rxjs';
import {Todo} from '../models/todo.model';
import {Injectable} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {SnackBarService} from '../services/snack-bar.service';
import {map} from 'rxjs/operators';

@Injectable()
export class TodoFacade {
    private todos$ = new BehaviorSubject<Array<Todo>>([]);
    private isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private todoService: TodoService,
                private snackBarService: SnackBarService) {
    }

    getCompletedTodos(): Observable<Array<Todo>> {
        return this.todos$.asObservable()
            .pipe(
                map(todos => todos.filter(todo => todo.isCompleted))
            );
    }

    getIncompleteTodos(): Observable<Array<Todo>> {
        return this.todos$.asObservable()
            .pipe(
                map(todos => todos.filter(todo => !todo.isCompleted))
            );
    }

    isLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    refreshTodos() {
        this.isLoading$.next(true);
        this.todoService.getTodos()
            .subscribe(todos => {
                this.todos$.next(todos);
                this.isLoading$.next(false);
            }, () => {
                this.snackBarService.showSnackBar('Something went wrong getting the todos...');
            });
    }

    createTodo(todo: Todo) {
        this.isLoading$.next(true);
        this.todoService.createTodo(todo)
            .subscribe(() => {
                this.refreshTodos();
            }, () => {
                this.snackBarService.showSnackBar('Something went wrong creating the todo...');
            });
    }

    updateTodo(todo: Todo) {
        this.isLoading$.next(true);
        this.todoService.updateTodo(todo)
            .subscribe(() => {
                this.refreshTodos();
            }, () => {
                this.snackBarService.showSnackBar('Something went wrong updating the todo...');
            });
    }

    deleteTodo(todo: Todo) {
        this.isLoading$.next(true);
        this.todoService.deleteTodo(todo)
            .subscribe(() => {
                this.refreshTodos();
            }, () => {
                this.snackBarService.showSnackBar('Something went wrong deleting the todo...');
            });
    }
}
