import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../models/todo.model';

@Component({
    selector: 'fa-todo-list',
    template: `
        <div class='todo-list'>
            <ul *ngIf='todos.length > 0'
                class='todo-list__list'>
                <li *ngFor='let todo of todos'>
                    <fa-todo
                        [todo]='todo'
                        (toggleCompleted)='toggleCompleted.emit(todo)'
                        (edit)='edit.emit(todo)'
                        (delete)='delete.emit(todo)'>
                    </fa-todo>
                </li>
            </ul>
            <span *ngIf='todos.length === 0'
                  class='todo-list__empty'>
                {{ emptyText }}
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
