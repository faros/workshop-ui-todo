import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {TodoFormDialogComponent} from './todo-form-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import SpyObj = jasmine.SpyObj;

describe('TodoFormDialogComponent', () => {
    let fixture: ComponentFixture<TodoFormDialogComponent>;
    let component: TodoFormDialogComponent;
    let dialogRef: SpyObj<MatDialogRef<TodoFormDialogComponent>>;
    let todo: Todo;

    const TITLE_SELECTOR = By.css('h1');
    const CANCEL_SELECTOR = By.css('.todo-form__cancel');
    const SUBMIT_SELECTOR = By.css('.todo-form__submit');

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => jasmine.createSpyObj('MatDialogRef', [
                        'close'
                    ])
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useFactory: () => todo
                }
            ],
            declarations: [
                TodoFormDialogComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        component.compileComponents();
    }));

    describe('when no todo is passed', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TodoFormDialogComponent);
            component = fixture.debugElement.componentInstance;
            dialogRef = TestBed.get(MatDialogRef);
            fixture.detectChanges();
        });

        it('should display an empty form', () => {
            expect(component.todoForm.get('text').value).toEqual('');
            expect(component.todoForm.get('description').value).toEqual('');
        });

        it('should display "Create todo" as the title', () => {
            expect(fixture.debugElement.query(TITLE_SELECTOR).nativeElement.innerText).toEqual('Create todo');
        });

        describe('when the user clicks the cancel button', () => {
            it('should close the dialog', () => {
                fixture.debugElement.query(CANCEL_SELECTOR).triggerEventHandler('click', undefined);

                expect(dialogRef.close).toHaveBeenCalled();
            });
        });

        describe('when the form is invalid', () => {
            it('should disable the submit button', () => {
                expect(fixture.debugElement.query(SUBMIT_SELECTOR).properties.disabled).toBeTruthy();
            });
        });

        describe('when the form is valid', () => {
            it('should enable the submit button', () => {
                component.todoForm.get('text').setValue('text');

                fixture.detectChanges();

                expect(fixture.debugElement.query(SUBMIT_SELECTOR).properties.disabled).toBeFalsy();
            });
        });

        it('should pass the form value to the dialog sumbit button', () => {
            component.todoForm.get('text').setValue('text');

            fixture.detectChanges();

            expect(fixture.debugElement.query(SUBMIT_SELECTOR).properties['mat-dialog-close']).toEqual({
                text: 'text',
                description: ''
            });
        });
    });

    describe('when a todo is passed', () => {
        beforeEach(() => {
            todo = {
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: true
            };
            fixture = TestBed.createComponent(TodoFormDialogComponent);
            component = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should populate the form with the todo data', () => {
            expect(component.todoForm.get('text').value).toEqual('text');
            expect(component.todoForm.get('description').value).toEqual('description');
        });

        it('should display "Update todo" as the title', () => {
            expect(fixture.debugElement.query(TITLE_SELECTOR).nativeElement.innerText).toEqual('Update todo');
        });
    });
});
