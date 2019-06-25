import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA} from '@angular/core';
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
        todoFacade.getIncompleteTodos.and.returnValue(of([incompleteTodo]));

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
        expect(todoLists[1].properties.todos).toEqual([{
            id: '1',
            text: 'text',
            description: 'description',
            isCompleted: true
        } as Todo]);
    });

    describe('when loading', () => {
        beforeEach(() => {
            todoFacade.isLoading.and.returnValue(of(true));
            fixture.detectChanges();
        });

        it('should show the spinner', () => {
            expect(fixture.debugElement.query(SPINNER_SELECTOR)).not.toBeNull();
        });

        it('should hide the todo list', () => {
            expect(fixture.debugElement.queryAll(TODO_LIST_SELECTOR).length).toEqual(0);
        });
    });

    describe('when the user creates a todo', () => {
        it('should create the todo using the todoFacade', () => {
            fixture.debugElement.query(NEW_TODO_BUTTON_SELECTOR).triggerEventHandler('createTodo', {
                text: 'text',
                isCompleted: false
            } as Todo);

            expect(todoFacade.createTodo).toHaveBeenCalledWith({
                text: 'text',
                isCompleted: false
            } as Todo);
        });
    });

    describe('when the user toggles a todo', () => {
        it('should toggle and update the todo using the todoFacade', () => {
            const todoLists = fixture.debugElement.queryAll(TODO_LIST_SELECTOR);

            todoLists[0].triggerEventHandler('toggleCompleted', incompleteTodo);
            expect(todoFacade.updateTodo).toHaveBeenCalledWith({
                id: '2',
                text: 'Pizza',
                isCompleted: true
            } as Todo);

            todoFacade.updateTodo.calls.reset();

            todoLists[1].triggerEventHandler('toggleCompleted', completedTodo);
            expect(todoFacade.updateTodo).toHaveBeenCalledWith({
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: false
            } as Todo);
        });
    });

    describe('when the user edits a todo', () => {
        it('should show the "TodoFormDialogComponent" dialog with the given todo', () => {
            const todoLists = fixture.debugElement.queryAll(TODO_LIST_SELECTOR);
            const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

            dialog.open.and.returnValue(dialogRef);
            dialogRef.afterClosed.and.returnValue(NEVER);

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
                const todoLists = fixture.debugElement.queryAll(TODO_LIST_SELECTOR);
                const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

                dialog.open.and.returnValue(dialogRef);
                dialogRef.afterClosed.and.returnValue(of({
                    text: 'cool',
                    description: 'neat'
                } as Todo));

                todoLists[0].triggerEventHandler('edit', incompleteTodo);

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
                const todoLists = fixture.debugElement.queryAll(TODO_LIST_SELECTOR);
                const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

                dialog.open.and.returnValue(dialogRef);
                dialogRef.afterClosed.and.returnValue(of(undefined));

                todoLists[0].triggerEventHandler('edit', incompleteTodo);

                expect(todoFacade.updateTodo).not.toHaveBeenCalled();
            });
        });
    });

    describe('when the user deletes a todo', () => {
        it('should delete the todo using the todoFacade', () => {
            const todoLists = fixture.debugElement.queryAll(TODO_LIST_SELECTOR);

            todoLists[0].triggerEventHandler('delete', incompleteTodo);
            expect(todoFacade.deleteTodo).toHaveBeenCalledWith({
                id: '2',
                text: 'Pizza',
                isCompleted: false
            } as Todo);

            todoFacade.updateTodo.calls.reset();

            todoLists[1].triggerEventHandler('delete', completedTodo);
            expect(todoFacade.deleteTodo).toHaveBeenCalledWith({
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: true
            } as Todo);
        });
    });
});
