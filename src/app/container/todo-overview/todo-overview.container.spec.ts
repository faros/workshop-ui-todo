import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import SpyObj = jasmine.SpyObj;
import {TodoOverviewContainer} from './todo-overview.container';
import {TodoFacade} from '../../facade/todo.facade';
import {NEVER, of} from 'rxjs';
import {Todo} from '../../models/todo.model';
import {TodoFormDialogComponent} from '../todo-form-dialog/todo-form-dialog.component';

describe('TodoOverviewContainer', () => {
    let fixture: ComponentFixture<TodoOverviewContainer>;
    let component: TodoOverviewContainer;
    let dialog: SpyObj<MatDialog>;
    let todoFacade: SpyObj<TodoFacade>;
    let incompleteTodo: Todo;
    let completedTodo: Todo;

    const TODO_LIST_SELECTOR = By.css('fa-todo-list');
    const SPINNER_SELECTOR = By.css('mat-spinner');
    const NEW_TODO_BUTTON_SELECTOR = By.css('fa-new-todo-button');

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                // Provide the injectable and return mock objects.
                {
                    provide: MatDialog,
                    useFactory: () => jasmine.createSpyObj('MatDialog', [
                        'open'
                    ])
                },
                {
                    provide: TodoFacade,
                    useFactory: () => jasmine.createSpyObj('TodoFacade', [
                        'refreshTodos', 'createTodo', 'updateTodo', 'deleteTodo', 'isLoading',
                        'getIncompleteTodos', 'getCompletedTodos'
                    ])
                }
            ],
            declarations: [
                TodoOverviewContainer
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoOverviewContainer);
        component = fixture.debugElement.componentInstance;
        dialog = TestBed.get(MatDialog);
        todoFacade = TestBed.get(TodoFacade);

        incompleteTodo = {
            id: '2',
            text: 'Pizza',
            isCompleted: false
        } as Todo;
        todoFacade.getIncompleteTodos.and.returnValue(of([incompleteTodo])); // Don't forget to return a observable.

        completedTodo = {
            id: '1',
            text: 'text',
            description: 'description',
            isCompleted: true
        } as Todo;
        todoFacade.getCompletedTodos.and.returnValue(of([completedTodo]));

        fixture.detectChanges();
    });

    describe('when initializing the component', () => {
        it('should refresh the todos', () => {
             expect(todoFacade.refreshTodos).toHaveBeenCalled();
        });
    });

    it('should display all the todos', () => {
        fixture.detectChanges();

        const todoLists = fixture.debugElement.queryAll(TODO_LIST_SELECTOR);

        expect(todoLists[0].properties.todos).toEqual([{
            id: '2',
            text: 'Pizza',
            isCompleted: false
        } as Todo]);

        // TODO: check second list.
    });

    describe('when loading', () => {
        beforeEach(() => {
            todoFacade.isLoading.and.returnValue(of(true));
            fixture.detectChanges();
        });

        it('should show the spinner', () => {
            // TODO: implement
        });

        it('should hide the todo list', () => {
            // TODO: implement
        });
    });

    describe('when the user creates a todo', () => {
        it('should create the todo using the todoFacade', () => {

            // TODO: implement, trigger button even with mock button.triggerEventHandler(method, data);
            // TODO: Check todoFacade createTodo call.
        });
    });

    describe('when the user toggles a todo', () => {
        it('should toggle and update the todo using the todoFacade', () => {
            /**
             * TODO:
             *  get all todo lists on the page
             *  trigger toggleCompleted event on the first list with incompleteTodo as the parameter.
             *  check if todoFacade.updateTodo method had been called with correct param.
             *  reset updateTodo calls (todoFacade.updateTodo.calls.reset();)
             *  trigger toggleCompleted event on second list with completeTodo as the parameter.
             *  Check updateTodo again
             */
        });
    });

    describe('when the user edits a todo', () => {
        let dialogRef: SpyObj<MatDialogRef<TodoFormDialogComponent>>;
        let todoLists: Array<DebugElement>;

        beforeEach(() => {
            dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
            dialogRef.afterClosed.and.returnValue(NEVER); // By default, never call the afterClosed event

            dialog.open.and.returnValue(dialogRef);
            todoLists = fixture.debugElement.queryAll(TODO_LIST_SELECTOR);
        });

        it('should show the "TodoFormDialogComponent" dialog with the given todo', () => {
            todoLists[0].triggerEventHandler('edit', incompleteTodo);
            expect(dialog.open).toHaveBeenCalledWith(TodoFormDialogComponent, {
                data: {
                    id: '2',
                    text: 'Pizza',
                    isCompleted: false
                } as Todo
            });

            dialog.open.calls.reset();

            todoLists[1].triggerEventHandler('edit', completedTodo);
            expect(dialog.open).toHaveBeenCalledWith(TodoFormDialogComponent, {
                data: {
                    id: '1',
                    text: 'text',
                    description: 'description',
                    isCompleted: true
                } as Todo
            });
        });

        describe('given the user has submitted the dialog', () => {
            it('should update the todo using the todoFacade', () => {
                // Change the afterClosed function so it returns an observable which will immediately output a TodoModel.
                // We do this BEFORE the user clicks on the edit button, because we have to setup our stubbed functions
                // before the edit code is ran.

                dialogRef.afterClosed.and.returnValue(of({
                    text: 'cool',
                    description: 'neat'
                } as Todo));

                // Simulate the edit
                todoLists[0].triggerEventHandler('edit', incompleteTodo);
                // After this line the afterClosed subscription will resolve because of the of({...}) stubbing we did earlier.

                expect(todoFacade.updateTodo).toHaveBeenCalledWith({
                    id: '2',
                    text: 'cool',
                    description: 'neat',
                    isCompleted: false
                } as Todo);
            });
        });

        describe('given the user has cancelled the dialog', () => {
            it('should not update the todo using the todoFacade', () => {
                /**
                 * TODO:
                 *  Make afterClosed return an observable which outputs undefined (the user cancelled the dialog)
                 *  Click on the edit button.
                 *  Check if the updateTodo function has not been called.
                 */
            });
        });
    });

    describe('when the user deletes a todo', () => {
        it('should delete the todo using the todoFacade', () => {
            /**
             * TODO:
             *  get all todo lists on the page
             *  trigger delete event on the first list with incompleteTodo as the parameter.
             *  check if todoFacade.deleteTodo method had been called with correct param.
             *  reset delete calls (todoFacade.deleteTodo.calls.reset();)
             *  trigger delete event on second list with completeTodo as the parameter.
             *  Check deleteTodo again
             */
        });
    });
});
