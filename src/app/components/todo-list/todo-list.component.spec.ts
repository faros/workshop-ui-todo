import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {TodoListComponent} from './todo-list.component';

describe('TodoListComponent', () => {
    let fixture: ComponentFixture<TodoListComponent>;
    let component: TodoListComponent;
    let todos: Array<Todo>;

    const TODO_SELECTOR = By.css('fa-todo');
    const TODO_LIST_SELECTOR = By.css('.todo-list__list');
    const EMPTY_SELECTOR = By.css('.todo-list__empty');

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            declarations: [
                TodoListComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.debugElement.componentInstance;

        todos = [{
            id: '1',
            text: 'Pizza',
            isCompleted: true
        }, {
            id: '2',
            text: 'Pasta',
            description: 'penne',
            isCompleted: false
        }];
        component.todos = todos;
        fixture.detectChanges();
    });

    describe('when the are todos', () => {
        it('should display all the todos', () => {
            const todoComponents = fixture.debugElement.queryAll(TODO_SELECTOR);

            expect(todoComponents.length).toEqual(2);
            expect(todoComponents[0].properties.todo).toEqual(todos[0]);
            expect(todoComponents[1].properties.todo).toEqual(todos[1]);
        });

        it('should not display the emptyText', () => {
            expect(fixture.debugElement.query(EMPTY_SELECTOR)).toBeNull();
        });

        describe('given the user toggles the completion of a todo', () => {
            it('should emit the "toggleCompleted" event with the todo', () => {
                // TODO: implement
            });
        });

        describe('given the user wants to edit a todo', () => {
            it('should emit the "edit" event with the todo', () => {
                // TODO: implement
            });
        });

        describe('given the user wants to delete a todo', () => {
            it('should emit the "delete" event with the todo', () => {
                // TODO: implement
            });
        });
    });

    describe('when there are no todos', () => {
        beforeEach(() => {
            // TODO: implement setup

            fixture.detectChanges();
        });

        it('should display the emptyText', () => {
            // TODO: implement
        });

        it('should hide the todo list', () => {
            // TODO: implement
        });
    });
});
