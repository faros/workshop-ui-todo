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
        todoService = TestBed.get(TodoService);
        snackBarService = TestBed.get(SnackBarService);
        facade = TestBed.get(TodoFacade);
    });

    describe('refreshTodos', () => {
        it('should start loading', () => {
            todoService.getTodos.and.returnValue(NEVER);
            facade.refreshTodos();

            facade.isLoading().subscribe(isLoading => {
                expect(isLoading).toBeTruthy();
            });
        });

        it('should fetch the todos usin the todoService', () => {
            todoService.getTodos.and.returnValue(NEVER);
            facade.refreshTodos();

            expect(todoService.getTodos).toHaveBeenCalled();
        });

        describe('given the call succeeds', () => {
            it('should stop loading', () => {
                todoService.getTodos.and.returnValue(of([]));
                facade.refreshTodos();

                facade.isLoading().subscribe(isLoading => {
                    expect(isLoading).toBeFalsy();
                });
            });

            it('should update the todo observables', () => {
                todoService.getTodos.and.returnValue(of([{
                    id: '1',
                    text: 'text',
                    isCompleted: false
                } as Todo]));

                facade.refreshTodos();

                facade.getIncompleteTodos().subscribe(incompleteTodos => {
                    expect(incompleteTodos).toEqual([{
                        id: '1',
                        text: 'text',
                        isCompleted: false
                    } as Todo]);
                });
                facade.getCompletedTodos().subscribe(completedTodos => {
                    expect(completedTodos).toEqual([]);
                });
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
                todoService.getTodos.and.returnValue(throwError('err'));

                facade.refreshTodos();

                expect(snackBarService.showSnackBar).toHaveBeenCalledWith('Something went wrong getting the todos...');
            });
        });
    });

    describe('getCompletedTodos', () => {
        it('should only return the completed todos', () => {
            const completedTodos = [{
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: true
            } as Todo];
            const incompleteTodos = [{
                id: '2',
                text: 'text2',
                isCompleted: false
            } as Todo];

            todoService.getTodos.and.returnValue(of([...completedTodos, ...incompleteTodos]));

            facade.refreshTodos();
            facade.getCompletedTodos().subscribe(todos => {
                expect(todos).toEqual(completedTodos);
            });
        });
    });

    describe('getIncompleteTodos', () => {
        it('should only return the incomplete todos', () => {
            const completedTodos = [{
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: true
            } as Todo];
            const incompleteTodos = [{
                id: '2',
                text: 'text2',
                isCompleted: false
            } as Todo];

            todoService.getTodos.and.returnValue(of([...completedTodos, ...incompleteTodos]));

            facade.refreshTodos();
            facade.getIncompleteTodos().subscribe(todos => {
                expect(todos).toEqual(incompleteTodos);
            });
        });
    });

    describe('createTodo', () => {
        let todo: Todo;

        beforeEach(() => {
            todo = {
                text: 'buy',
                isCompleted: false
            };
        });

        it('should start loading', () => {
            todoService.createTodo.and.returnValue(NEVER);
            facade.createTodo();

            facade.isLoading().subscribe(isLoading => {
                expect(isLoading).toBeTruthy();
            });
        });

        it('should create the todo using the todoService', () => {
            todoService.createTodo.and.returnValue(NEVER);
            facade.createTodo(todo);

            expect(todoService.createTodo).toHaveBeenCalledWith(todo);
        });

        describe('given the call succeeds', () => {
            beforeEach(() => {
                todoService.getTodos.and.returnValue(NEVER);
            });

            it('should refresh the todos', () => {
                todoService.createTodo.and.returnValue(of([]));
                facade.createTodo();

                expect(todoService.getTodos).toHaveBeenCalled();
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
                todoService.createTodo.and.returnValue(throwError('err'));

                facade.createTodo();

                expect(snackBarService.showSnackBar).toHaveBeenCalledWith('Something went wrong creating the todo...');
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
        });

        it('should start loading', () => {
            todoService.updateTodo.and.returnValue(NEVER);
            facade.updateTodo();

            facade.isLoading().subscribe(isLoading => {
                expect(isLoading).toBeTruthy();
            });
        });

        it('should create the todo using the todoService', () => {
            todoService.updateTodo.and.returnValue(NEVER);
            facade.updateTodo(todo);

            expect(todoService.updateTodo).toHaveBeenCalledWith(todo);
        });

        describe('given the call succeeds', () => {
            beforeEach(() => {
                todoService.getTodos.and.returnValue(NEVER);
            });

            it('should refresh the todos', () => {
                todoService.updateTodo.and.returnValue(of([]));
                facade.updateTodo();

                expect(todoService.getTodos).toHaveBeenCalled();
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
                todoService.updateTodo.and.returnValue(throwError('err'));

                facade.updateTodo();

                expect(snackBarService.showSnackBar).toHaveBeenCalledWith('Something went wrong updating the todo...');
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
        });

        it('should start loading', () => {
            todoService.deleteTodo.and.returnValue(NEVER);
            facade.deleteTodo();

            facade.isLoading().subscribe(isLoading => {
                expect(isLoading).toBeTruthy();
            });
        });

        it('should create the todo using the todoService', () => {
            todoService.deleteTodo.and.returnValue(NEVER);
            facade.deleteTodo(todo);

            expect(todoService.deleteTodo).toHaveBeenCalledWith(todo);
        });

        describe('given the call succeeds', () => {
            beforeEach(() => {
                todoService.getTodos.and.returnValue(NEVER);
            });

            it('should refresh the todos', () => {
                todoService.deleteTodo.and.returnValue(of([]));
                facade.deleteTodo();

                expect(todoService.getTodos).toHaveBeenCalled();
            });
        });

        describe('given the call fails', () => {
            it('should display a snackBar message', () => {
                todoService.deleteTodo.and.returnValue(throwError('err'));

                facade.deleteTodo();

                expect(snackBarService.showSnackBar).toHaveBeenCalledWith('Something went wrong deleting the todo...');
            });
        });
    });
});
