import {Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {MatDialog} from '@angular/material';
import {TodoFormDialogComponent} from '../todo-form-dialog/todo-form-dialog.component';
import {TodoFacade} from '../../facade/todo.facade';

@Component({
    selector: 'fa-todo-overview',
    template: `
        <div class='todo-overview'>
            <h1>Todo list</h1>
            <ng-container *ngIf='!(todoFacade.isLoading() | async)'>
                <section>
                    <h2 class='todo-overview__header'>
                        Incomplete
                        <fa-new-todo-button (createTodo)='createTodo($event)'></fa-new-todo-button>
                    </h2>
                    <fa-todo-list
                        emptyText="Everything has been completed, congrats!"
                        [todos]='todoFacade.getIncompleteTodos() | async'
                        (toggleCompleted)='toggleCompleted($event)'
                        (edit)='editTodo($event)'
                        (delete)='deleteTodo($event)'>
                    </fa-todo-list>
                </section>
                <section>
                    <h2>Completed</h2>
                    <fa-todo-list
                        emptyText="No todos completed yet ..."
                        [todos]='todoFacade.getCompletedTodos() | async'
                        (toggleCompleted)='toggleCompleted($event)'
                        (edit)='editTodo($event)'
                        (delete)='deleteTodo($event)'>
                    </fa-todo-list>
                </section>
            </ng-container>
            <mat-spinner *ngIf='(todoFacade.isLoading() | async)'></mat-spinner>
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
