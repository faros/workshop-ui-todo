import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../models/todo.model';

/*
*   TODO: Display all the todo's instead of just the first one.
*   TODO: The todo component can send out events, capture all of them, and rethrow them.
*    (When emitting the event; be sure to include which Todo is being edited, deleted, ...)
*   TODO: Display the emptyText when there are no todos.
*
* */

@Component({
    selector: 'fa-todo-list',
    template: `
        <div class='todo-list'>
            <ul class='todo-list__list'>
                <li>
                    <fa-todo
                        *ngIf='todos[0]'
                        [todo]='todos[0]'>
                    </fa-todo>
                </li>
            </ul>
            <span class='todo-list__empty'>
            </span>
        </div>
    `,
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
    @Input() todos: Array<Todo> = [];
    @Input() emptyText: string;
    @Output() toggleCompleted = new EventEmitter<Todo>();
    @Output() edit = new EventEmitter<Todo>();
    @Output() delete = new EventEmitter<Todo>();
}
