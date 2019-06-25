import {async, TestBed} from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import {TodoService} from '../services/todo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Todo} from '../models/todo.model';

// Interesting article about testing http: https://medium.com/netscape/testing-with-the-angular-httpclient-api-648203820712

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
        it('should return the todos', () => {
            const todos = [{
                id: '1',
                text: 'text',
                description: 'description',
                isCompleted: false
            } as Todo];

            // Call the function we want to test, since its using httpClient (which we mocked with the HttpTestingController)
            // it won't immediately get a value.
            service.getTodos().subscribe(result => {
                expect(result).toEqual(todos);
            });

            // Expect the url to have been called.
            const req = httpMock.expectOne('/todos');

            // Check if the method was GET
            expect(req.request.method).toEqual('GET');

            // Pretend the call was completed by emitting an event, this will be on the observable returned by http.get().
            // After this the observable we subscribe to above, will get a value and we can check if the results match.
            req.flush(todos);
        });
    });

    describe('createTodo', () => {
        it('should create and return the todo', () => {
            // TODO: implement, make sure the request returns a todo with an ID and check the request body.
        });
    });

    describe('update', () => {
        it('should update and return the todo', () => {
            // TODO: implement, make sure the request to check the request body.
        });
    });

    describe('delete', () => {
        it('should delete the todo', () => {
            // TODO: implement, be sure to subscribe, even though we won't be expecting data.
        });
    });
});
