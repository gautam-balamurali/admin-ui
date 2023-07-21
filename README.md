# 👨🏼‍💻Admin UI👩🏼‍💻

- An interface for admins to see and delete users.
- Column titles stand out from the entries.
- A search bar that can filter on any property.
- Admin is able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
- Implemented pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. Pagination is updated based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons will only go till 3.
- Admin is able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.
- Checkbox on the top left is a shortcut to select or deselect all displayed rows. This will be applied only to the ten rows displayed in the current page, and not all 50 rows.

* Adoptive design - design will change according to the number of cards within the page at the time.
* This app is responsive for all the screen sizes.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Demo

https://www.loom.com/share/7a860bcf70b647de87d009600fb229de?sid=f2e39ce6-5ac0-434c-b392-30352cb43714

## Preview

[View Live](https://admin-ui-gautam-balamurali.netlify.app/home)

## Tech Stack

- Angular 13
- SCSS
- Prime NG
- Angular Material
- Jasmine and Karma for unit tests
- Netlify for deployment

## Future work

- Add column sort functionalities
- Fix edge cases if any
- Make app CSS responsive and add aesthetics

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
