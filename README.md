# Todo

You can find the full app on the `solution` branch.
Every file has a list of TODO's that need to be implemented.
The best way to get started is to implement the following files, from top to bottom:
* todo.component.ts
* todo-list.component.ts
* todo-overview.container.ts
* todo.facade.ts
* todo-form-dialog.ts

Try and implement at least a couple of tests per component.
Be sure to read the already implemented tests, they serve as a useful example for the unimplemented tests.
Tests are using [jasmine](https://jasmine.github.io/tutorials/your_first_suite).

[More information about angular tests](https://angular.io/guide/testing#component-test-basics)

Lastly, if you only want to run a specific test, or set of tests, use `fdescribe` instead of `describe` and `fit` instead of `fit`.
Don't forget to remove to revert them afterwards though!

Since a lot of tests fail by default, try using `fdescribe` on the first describe in your test file, to only run those tests.

## Starting the app

Run `npm run start` (or `yarn start`). Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Starting the database

Run `npm run startdb` (or `yarn startdb`). 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
