import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {TodoComponent} from './todo.component';

describe('TodoComponent', () => {
    let fixture: ComponentFixture<TodoComponent>;
    let component: TodoComponent;
    let todo: Todo;

    const CHECKBOX_SELECTOR = By.css('mat-checkbox');
    const EDIT_BUTTON_SELECTOR = By.css('fa-icon-button[icon="edit"]');
    const DELETE_BUTTON_SELECTOR = By.css('fa-icon-button[icon="delete"]');

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            declarations: [
                TodoComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.debugElement.componentInstance;

        todo = {
            id: '1',
            text: 'text',
            description: 'description',
            isCompleted: false
        };
        component.todo = todo;
        fixture.detectChanges();
    });

    it('should show a checkbox that is checked based on the isCompleted flag', () => {
        const checkbox = fixture.debugElement.query(CHECKBOX_SELECTOR);

        expect(checkbox.properties.checked).toEqual(false);

        todo.isCompleted = true;
        fixture.detectChanges();
        expect(checkbox.properties.checked).toEqual(true);
    });

    it('should show the description if provided', () => {
        const checkbox = fixture.debugElement.query(CHECKBOX_SELECTOR);

        expect(checkbox.nativeElement.innerText).toEqual('text - description');

        todo.description = undefined;
        fixture.detectChanges();
        expect(checkbox.nativeElement.innerText).toEqual('text');
    });

    describe('when the user checks the checkbox', () => {
        it('should emit the "toggleCompleted" event', () => {
            spyOn(component.toggleCompleted, 'emit');

            fixture.debugElement.query(CHECKBOX_SELECTOR).triggerEventHandler('change', undefined);

            expect(component.toggleCompleted.emit).toHaveBeenCalled();
        });
    });

    describe('when the user clicks the edit button', () => {
        it('should emit the "edit" event', () => {
            spyOn(component.edit, 'emit');

            fixture.debugElement.query(EDIT_BUTTON_SELECTOR).triggerEventHandler('iconClick', undefined);

            expect(component.edit.emit).toHaveBeenCalled();
        });
    });

    describe('when the user clicks the delete button', () => {
        it('should emit the "delete" event', () => {
            spyOn(component.delete, 'emit');

            fixture.debugElement.query(DELETE_BUTTON_SELECTOR).triggerEventHandler('iconClick', undefined);

            expect(component.delete.emit).toHaveBeenCalled();
        });
    });
});
