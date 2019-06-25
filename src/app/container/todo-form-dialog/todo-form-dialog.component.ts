import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Todo} from '../../models/todo.model';
import {FormGroup} from '@angular/forms';

/*
*   TODO: Add form for title (required) and description (optional)
*   TODO: Add cancel button
*   TODO: Add submit button, make it disabled when the form is invalid.
*   TODO: Display "Create todo" when no existing todo is passed to the component, else display "Update todo"
*   TODO: When a todo is passed to the component, fill in the form with the data.
*
* Useful documentation:
*   https://material.angular.io/components/dialog/overview
*   https://angular.io/guide/reactive-forms
* */

@Component({
    template: `
        <div class='todo-form'>
            <div class='todo-form__form'>
            </div>
        </div>
    `,
    styleUrls: ['./todo-form-dialog.component.scss']
})
export class TodoFormDialogComponent implements OnInit {
    todoForm = new FormGroup({

    });

    constructor(private dialogRef: MatDialogRef<TodoFormDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private todo: Todo) {
    }

    ngOnInit() {
        if (this.todo) {
            this.todoForm.patchValue(this.todo);
        }
    }
}
