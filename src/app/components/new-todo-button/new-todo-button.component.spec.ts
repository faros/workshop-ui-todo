import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NewTodoButtonComponent} from './new-todo-button.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import SpyObj = jasmine.SpyObj;
import {TodoFormDialogComponent} from '../../container/todo-form-dialog/todo-form-dialog.component';
import {NEVER, of} from 'rxjs';
import {Todo} from '../../models/todo.model';

describe('NewTodoButtonComponent', () => {
    let fixture: ComponentFixture<NewTodoButtonComponent>;
    let component: NewTodoButtonComponent;
    let matDialog: SpyObj<MatDialog>;
    let matDialogRef: SpyObj<MatDialogRef<TodoFormDialogComponent>>;

    const ICON_BUTTON_SELECTOR = By.css('fa-icon-button');

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            providers: [
                {
                    provide: MatDialog,
                    useFactory: () => jasmine.createSpyObj('MatDialog', [
                        'open', 'afterClosed'
                    ])
                }
            ],
            declarations: [
                NewTodoButtonComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewTodoButtonComponent);
        component = fixture.debugElement.componentInstance;
        matDialog = TestBed.get(MatDialog);

        matDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        matDialogRef.afterClosed.and.returnValue(NEVER);
        matDialog.open.and.returnValue(matDialogRef);

        fixture.detectChanges();
    });

    it('should the icon-button component with the "add_box" icon', () => {
        expect(fixture.debugElement.query(ICON_BUTTON_SELECTOR).attributes.icon).toEqual('add_box');
    });

    describe('when the user has clicked on the icon', () => {

        beforeEach(() => {
        });

        it('should open the "TodoFormDialogComponent" dialog', () => {
            fixture.debugElement.query(ICON_BUTTON_SELECTOR).triggerEventHandler('iconClick', undefined);

            expect(matDialog.open).toHaveBeenCalledWith(TodoFormDialogComponent);
        });

        describe('given the user submitted the dialog', () => {
            it('should emit the "createTodo" event with the new todo', () => {
                spyOn(component.createTodo, 'emit');

                matDialogRef.afterClosed.and.returnValue(of({
                    text: 'text',
                    description: 'description',
                } as Todo));
                fixture.debugElement.query(ICON_BUTTON_SELECTOR).triggerEventHandler('iconClick', undefined);

                expect(component.createTodo.emit).toHaveBeenCalledWith({
                    text: 'text',
                    description: 'description',
                } as Todo);
            });
        });

        describe('given the user has cancelled the dialog', () => {
            it('should not emit the "createTodo" event', () => {
                spyOn(component.createTodo, 'emit');

                matDialogRef.afterClosed.and.returnValue(of(undefined));
                fixture.debugElement.query(ICON_BUTTON_SELECTOR).triggerEventHandler('iconClick', undefined);

                expect(component.createTodo.emit).not.toHaveBeenCalled();
            });
        });
    });
});
