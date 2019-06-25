import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {TodoComponent} from './todo.component';

describe('TodoComponent', () => {
    let fixture: ComponentFixture<TodoComponent>;
    let component: TodoComponent;
    let todo: Todo;

    // Some useful selectors (Can also be classes like .todo__actions, or ids #component123)
    const CHECKBOX_SELECTOR = By.css('mat-checkbox');
    const EDIT_BUTTON_SELECTOR = By.css('fa-icon-button[icon="edit"]');
    const DELETE_BUTTON_SELECTOR = By.css('fa-icon-button[icon="delete"]');

    beforeEach(async(() => {
        // Angular setup
        const component = TestBed.configureTestingModule({
            declarations: [
                TodoComponent // declare the component we want to test
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoComponent); // Create the test fixture we'll use to our component
        component = fixture.debugElement.componentInstance; // Get the instance of our component

        todo = {
            id: '1',
            text: 'text',
            description: 'description',
            isCompleted: false
        };
        component.todo = todo; // Set some mock data on our component
        fixture.detectChanges(); // Re-render template
    });

    it('should show a checkbox that is checked based on the isCompleted flag', () => {
        const checkbox = fixture.debugElement.query(CHECKBOX_SELECTOR); // Find element the checkbox element

        expect(checkbox.properties.checked).toEqual(false); // see if the property checked is false

        todo.isCompleted = true; // Change state
        fixture.detectChanges(); // Re-render template to see change
        expect(checkbox.properties.checked).toEqual(true); // Check that our 2-way binding worked
    });

    it('should show the description if provided', () => {
        const checkbox = fixture.debugElement.query(CHECKBOX_SELECTOR); // Give back an object of the class DebugElement

        // Use the debugElement.nativeElement.innerText to check the text.

        // TODO: implement
    });

    describe('when the user checks the checkbox', () => {
        it('should emit the "toggleCompleted" event', () => {
            spyOn(component.toggleCompleted, 'emit'); // Spy on the emit event

            fixture.debugElement.query(CHECKBOX_SELECTOR).triggerEventHandler('change', undefined);
            // Trigger the change event on the checkbox

            expect(component.toggleCompleted.emit).toHaveBeenCalled(); // Check if our component emited the correct event.
        });
    });

    describe('when the user clicks the edit button', () => {
        it('should emit the "edit" event', () => {
            // TODO: implement
        });
    });

    describe('when the user clicks the delete button', () => {
        it('should emit the "delete" event', () => {
            // TODO: implement
        });
    });
});
