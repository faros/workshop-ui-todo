import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../models/todo.model';

/*
*   TODO: Display the description when a TODO has one. Should be in the form of "text - description"
*    You can use the "todo_description" class to color the text gray.
*   TODO: Add an edit and delete button. Use the fa-icon-button component. Icons should be 'edit' and 'delete'.
*    Be sure to emit an event for both of these actions.
*    And put them in the todo__actions element, this makes it so you need to hover over the component to see the icons.
* */

@Component({
    selector: 'fa-todo',
    template: `
        <div class='todo'>
            <mat-checkbox
                (change)='toggleCompleted.emit()'
                [checked]='todo.isCompleted'>
                {{ todo.text }}
            </mat-checkbox>
            <div class='todo__actions'>
            </div>
        </div>
    `,
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
    @Input() todo: Todo;
    @Output() toggleCompleted = new EventEmitter<void>();
}
