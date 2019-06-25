import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {
    private readonly CLOSE = 'Close';

    constructor(private snackBar: MatSnackBar) {

    }

    showSnackBar(message: string) {
        this.snackBar.open(message, this.CLOSE);
    }
}
