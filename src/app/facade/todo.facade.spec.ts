import {async, TestBed} from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import {TodoService} from '../services/todo.service';
import {SnackBarService} from '../services/snack-bar.service';
import {NEVER, of, throwError} from 'rxjs';
import {Todo} from '../models/todo.model';
import {TodoFacade} from './todo.facade';

describe('TodoFacade', () => {
    let todoService: SpyObj<TodoService>;
    let snackBarService: SpyObj<SnackBarService>;
    let facade: SpyObj<TodoFacade>;

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            providers: [
                {
                    provide: TodoService,
                    useFactory: () => jasmine.createSpyObj('TodoService', [
                        'getTodos', 'createTodo', 'updateTodo', 'deleteTodo'
                    ])
                },
                {
                    provide: SnackBarService,
                    useFactory: () => jasmine.createSpyObj('SnackBarService', [
                        'showSnackBar'
                    ])
                },
                TodoFacade
            ]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        // Notice how we are not using fixture here, we don't have to render any HTML/components.
        // We also didn't declare any components in our testingModule
        todoService = TestBed.get(TodoService);
        snackBarService = TestBed.get(SnackBarService);
        facade = TestBed.get(TodoFacade);
    });

    describe('refreshTodos', () => {
        beforeEach(() => {
            // By default a spy returns undefined, to avoid a NPE when the code tries to do
            // todoService.getTodos().subscribe()
            // we return an observable which never completes (and thus we avoid executing the subscribe function).
            todoService.getTodos.and.returnValue(NEVER);
        });

        it('should start loading', () => {
            facade.refreshTodos();

            // Even though you might think observable are async, we can write our tests like this
            // because they are synchronous while testing.
            facade.isLoading().subscribe(isLoading => {
                expect(isLoading).toBeTruthy();
            });
        });

        it('should fetch the todos using the todoService', () => {
            // TODO: implement
        });

        describe('given the call succeeds', () => {
            it('should stop loading', () => {
                // Return an actual value this time.
                todoService.getTodos.and.returnValue(of([]));

                facade.refreshTodos();

                // TODO: implement isLoading check.
            });

            it('should update the todo observables', () => {
                // Return some data this time
                todoService.getTodos.and.returnValue(of([{
                    id: '1',
                    text: 'text',
                    isCompleted: false
                } as Todo]));

                facade.refreshTodos();

                // TODO: similarly to how we tested isLoading, test both the getCompletedTodos and getIncompletedTodos observables.
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
                todoService.getTodos.and.returnValue(throwError('err'));

                facade.refreshTodos();

                // TODO: check snackBar call.
            });
        });
    });

    describe('getCompletedTodos', () => {
        it('should only return the completed todos', () => {
            // TODO: we kind of already implemented this in the refreshTodo test, but it's not bad to write another test just for this method.
        });
    });

    describe('getIncompleteTodos', () => {
        it('should only return the incomplete todos', () => {
            // TODO: we kind of already implemented this in the refreshTodo test, but it's not bad to write another test just for this method.
        });
    });

    // TODO: the following methods are very similar, you don't have to test them all, but it's good practise nevertheless.

    describe('createTodo', () => {
        let todo: Todo;

        beforeEach(() => {
            todo = {
                text: 'buy',
                isCompleted: false
            };
            todoService.createTodo.and.returnValue(NEVER);
        });

        it('should start loading', () => {
        });

        it('should create the todo using the todoService', () => {
        });

        describe('given the call succeeds', () => {
            it('should refresh the todos', () => {
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
            });
        });
    });

    describe('updateTodo', () => {
        let todo: Todo;

        beforeEach(() => {
            todo = {
                text: 'buy',
                isCompleted: false
            };
            todoService.updateTodo.and.returnValue(NEVER);
        });

        it('should start loading', () => {
        });

        it('should create the todo using the todoService', () => {
        });

        describe('given the call succeeds', () => {
            it('should refresh the todos', () => {
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
            });
        });
    });

    describe('deleteTodo', () => {
        let todo: Todo;

        beforeEach(() => {
            todo = {
                text: 'buy',
                isCompleted: false
            };
            todoService.deleteTodo.and.returnValue(NEVER);
        });

        it('should start loading', () => {
        });

        it('should create the todo using the todoService', () => {
        });

        describe('given the call succeeds', () => {
            it('should refresh the todos', () => {
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
            });
        });
    });
});
