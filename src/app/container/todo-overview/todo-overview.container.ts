import {Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {MatDialog} from '@angular/material';
import {TodoFormDialogComponent} from '../todo-form-dialog/todo-form-dialog.component';
import {TodoFacade} from '../../facade/todo.facade';

/*
* For some of the following tasks you'll have to implement the facade functionality as well.
*
* TODO: Display both the completed and incomplete todo's
* TODO: React to the toggle, edit, update and delete events of the TodoListComponent. (Use the facade)
* TODO: Display a mat-spinner component (Material component) while loading.
* TODO: Hide the todo section while loading.
* TODO: Add the fa-new-todo-button component in the header, react to the createTodo event.
*  Implement the tasks in the TodoFormDialogComponent
* */

@Component({
    selector: 'fa-todo-overview',
    template: `
        <div class='todo-overview'>
            <h1>Todo list</h1>
            <ng-container>
                <h2 class='todo-overview__header'>
                    Todo
                    <fa-new-todo-button (createTodo)='createTodo($event)'></fa-new-todo-button>
                </h2>
                <fa-todo-list
                    [todos]='todoFacade.getCompletedTodos() | async'>
                </fa-todo-list>
            </ng-container>
        </div>
    `,
    styleUrls: ['./todo-overview.container.scss']
})
export class TodoOverviewContainer implements OnInit {

    constructor(private matDialog: MatDialog,
                private todoFacade: TodoFacade) {
    }

    ngOnInit() {
        this.todoFacade.refreshTodos();
    }

    createTodo(todo: Todo) {
        this.todoFacade.createTodo(todo);
    }

    toggleCompleted(todo: Todo) {
        todo.isCompleted = !todo.isCompleted;
        this.todoFacade.updateTodo(todo);
    }

    editTodo(todo: Todo) {
        const dialog = this.matDialog.open(TodoFormDialogComponent, {
            data: todo
        });

        dialog.afterClosed().subscribe(editedTodo => {
            if (editedTodo) {
                this.todoFacade.updateTodo({
                    ...todo,
                    ...editedTodo
                });
            }
        });
    }

    deleteTodo(todo: Todo) {
        this.todoFacade.deleteTodo(todo);
    }
}
