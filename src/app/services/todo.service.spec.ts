import {async, TestBed} from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import {TodoService} from '../services/todo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Todo} from '../models/todo.model';

describe('TodoService', () => {
    let service: SpyObj<TodoService>;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                TodoService
            ]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(TodoService);
        httpMock = TestBed.get(HttpTestingController);
    });

    describe('getTodos', () => {
        it('should return the todos', (done) => {
            const todos = [{
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: false
            } as Todo];

            service.getTodos().subscribe(result => {
                expect(result).toEqual(todos);
                done();
            });

            const req = httpMock.expectOne('/todos');

            expect(req.request.method).toEqual('GET');

            req.flush(todos);
        });
    });

    describe('createTodo', () => {
        it('should create and return the todo', (done) => {
            const todo = {
                text: 'text',
                description: 'description',
                isCompleted: false
            } as Todo;

            service.createTodo(todo).subscribe(result => {
                expect(result).toEqual({
                    ...todo,
                    id: '1'
                });
                done();
            });

            const req = httpMock.expectOne('/todos');

            expect(req.request.body).toEqual(todo);
            expect(req.request.method).toEqual('POST');

            req.flush({
                ...todo,
                id: '1'
            });
        });
    });

    describe('update', () => {
        it('should update and return the todo', (done) => {
            const todo = {
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: false
            } as Todo;

            service.updateTodo(todo).subscribe(result => {
                expect(result).toEqual(todo);
                done();
            });

            const req = httpMock.expectOne('/todos/1');

            expect(req.request.body).toEqual(todo);
            expect(req.request.method).toEqual('PUT');

            req.flush(todo);
        });
    });

    describe('delete', () => {
        it('should delete the todo', () => {
            const todo = {
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: false
            } as Todo;

            service.deleteTodo(todo).subscribe(() => {});

            const req = httpMock.expectOne('/todos/1');

            expect(req.request.method).toEqual('DELETE');

            req.flush(null);
        });
    });
});
