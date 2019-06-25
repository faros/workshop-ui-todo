import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Todo} from '../../models/todo.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    template: `
        <div class='todo-form'>
            <h1 mat-dialog-title>{{ getTitle() }}</h1>
            <div mat-dialog-content>
                <form class='todo-form__form' [formGroup]='todoForm'>
                    <mat-form-field>
                        <input matInput cdkFocusInitial placeholder='Text' formControlName='text'>
                    </mat-form-field>
                    <mat-form-field>
                        <input matInput placeholder='Description' formControlName='description'>
                    </mat-form-field>
                </form>
            </div>
            <div mat-dialog-actions>
                <button mat-button
                        class='todo-form__cancel'
                        (click)="close()">
                    Cancel
                </button>
                <button mat-button
                        class='todo-form__submit'
                        [disabled]='todoForm.invalid'
                        [mat-dialog-close]="todoForm.value">
                    Submit
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./todo-form-dialog.component.scss']
})
export class TodoFormDialogComponent implements OnInit {
    todoForm = new FormGroup({
        text: new FormControl('', Validators.required),
        description: new FormControl(''),
    });

    constructor(private dialogRef: MatDialogRef<TodoFormDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private todo: Todo) {
    }

    ngOnInit() {
        if (this.todo) {
            this.todoForm.patchValue(this.todo);
        }
    }

    close() {
        this.dialogRef.close();
    }

    getTitle(): string {
        return this.todo ? 'Update todo' : 'Create todo';
    }
}
