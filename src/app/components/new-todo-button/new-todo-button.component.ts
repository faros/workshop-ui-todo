import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog, ThemePalette} from '@angular/material';
import {TodoFormDialogComponent} from '../../container/todo-form-dialog/todo-form-dialog.component';
import {Todo} from '../../models/todo.model';

@Component({
    selector: 'fa-new-todo-button',
    template: `
        <fa-icon-button icon='add_box' (iconClick)='openCreateTodoDialog()'>
        </fa-icon-button>
    `,
    styleUrls: ['./new-todo-button.component.scss']
})
export class NewTodoButtonComponent {

    @Output() createTodo = new EventEmitter<Todo>();

    constructor(private matDialog: MatDialog) {

    }

    openCreateTodoDialog() {
        const dialog = this.matDialog.open(TodoFormDialogComponent);

        dialog.afterClosed().subscribe(todo => {
            if (todo) {
                this.createTodo.emit(todo);
            }
        });
    }
}
