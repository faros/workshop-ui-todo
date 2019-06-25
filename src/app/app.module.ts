import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule, MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule, MatSnackBarModule
} from '@angular/material';
import {TodoComponent} from './components/todo/todo.component';
import {TodoService} from './services/todo.service';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {HttpClientModule} from '@angular/common/http';
import {TodoOverviewContainer} from './container/todo-overview/todo-overview.container';
import {ReactiveFormsModule} from '@angular/forms';
import {NewTodoButtonComponent} from './components/new-todo-button/new-todo-button.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {TodoFormDialogComponent} from './container/todo-form-dialog/todo-form-dialog.component';
import {SnackBarService} from './services/snack-bar.service';
import {IconButtonComponent} from './components/icon-button/icon-button.component';
import {TodoFacade} from './facade/todo.facade';

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        TodoListComponent,
        TodoOverviewContainer,
        NewTodoButtonComponent,
        TodoFormDialogComponent,
        IconButtonComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatInputModule,
        ColorPickerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule
    ],
    providers: [
        TodoService,
        TodoFacade,
        SnackBarService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        TodoFormDialogComponent
    ]
})
export class AppModule {
}
