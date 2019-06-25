import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../models/todo.model';

@Component({
    selector: 'fa-todo',
    template: `
        <div class='todo'>
            <mat-checkbox
                (change)='toggleCompleted.emit()'
                [checked]='todo.isCompleted'>
                {{ todo.text }}
                <span *ngIf='todo.description' class='todo__description'> - {{ todo.description }}</span>
            </mat-checkbox>
            <div class='todo__actions'>
                <fa-icon-button icon='edit' (iconClick)='edit.emit()'></fa-icon-button>
                <fa-icon-button icon='delete' (iconClick)='delete.emit()'></fa-icon-button>
            </div>
        </div>
    `,
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
    @Input() todo: Todo;
    @Output() toggleCompleted = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
}
