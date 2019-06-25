import {async, TestBed} from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import {SnackBarService} from './snack-bar.service';
import {MatSnackBar} from '@angular/material';

describe('SnackBarService', () => {
    let snackBar: SpyObj<MatSnackBar>;
    let service: SnackBarService;

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            providers: [
                {
                    provide: MatSnackBar,
                    useFactory: () => jasmine.createSpyObj('MatSnackBar', ['open'])
                },
                SnackBarService
            ]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(SnackBarService);
        snackBar = TestBed.get(MatSnackBar);
    });

    describe('showSnackBar', () => {
        it('should open a snackbar with the given message', () => {
            service.showSnackBar('help');

            expect(snackBar.open).toHaveBeenCalledWith('help', 'Close');
        });
    });
});
