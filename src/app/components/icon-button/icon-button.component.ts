import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ThemePalette} from '@angular/material';

@Component({
    selector: 'fa-icon-button',
    template: `
        <button class='icon-button'
                (click)='iconClick.emit()'
                (mouseenter)='mouseEnter()'
                (mouseleave)='mouseLeave()'>
            <mat-icon [color]='iconColor'>
                {{icon}}
            </mat-icon>
        </button>
    `,
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
    @Input() icon: string;
    @Output() iconClick = new EventEmitter<void>();

    iconColor: ThemePalette = 'primary';

    mouseEnter() {
        this.iconColor = 'accent';
    }

    mouseLeave() {
        this.iconColor = 'primary';
    }
}
