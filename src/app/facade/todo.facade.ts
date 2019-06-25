import {BehaviorSubject, Observable} from 'rxjs';
import {Todo} from '../models/todo.model';
import {Injectable} from '@angular/core';
import {TodoService} from '../services/todo.service';

/*
* Docs: https://www.learnrxjs.io/subjects/behaviorsubject.html (first example)
*
* TODO: (getCompletedTodos) Actually only return the completed todos instead of all of them.
* TODO: (getIncompleteTodos) Implement.
* TODO: (refreshTodos) Start loading, and stop loading when the call has completed.
* TODO: (create, update, delete) Implement, when successful, refresh the todos,
*  when it fails, display a cool snackbar. (Using the SnackBarService)
*
* TODO: (BONUS) A lot of the code is the same for edit, update and delete, try making some of the logic
*  abstract by using a function.
*  */

@Injectable()
export class TodoFacade {
    private todos$ = new BehaviorSubject<Array<Todo>>([]);
    private isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private todoService: TodoService) {
    }

    getCompletedTodos(): Observable<Array<Todo>> {
        return this.todos$.asObservable();
    }

    getIncompleteTodos(): Observable<Array<Todo>> {
        throw new Error('Not yet implemented');
    }

    isLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    refreshTodos() {
        this.todoService.getTodos()
            .subscribe(todos => {
                this.todos$.next(todos);
            });
    }

    createTodo(todo: Todo) {
        throw new Error('Not yet implemented');
    }

    updateTodo(todo: Todo) {
        throw new Error('Not yet implemented');
    }

    deleteTodo(todo: Todo) {
        throw new Error('Not yet implemented');
    }
}
