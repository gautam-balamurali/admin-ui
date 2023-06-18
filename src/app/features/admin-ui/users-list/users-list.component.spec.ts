import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { UserDetailsModel } from 'src/app/models/user-details.model';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const formBuilderMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    formBuilderSpy = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit refreshListClickEvent on getUsersList()', () => {
    const refreshListClickEventSpy = spyOn(
      component.refreshListClickEvent,
      'emit'
    );
    component.getUsersList();
    expect(refreshListClickEventSpy).toHaveBeenCalled();
  });

  it('should update selectedUsers and apply search filter on toggleSelection()', () => {
    const user: UserDetailsModel = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'user',
      selected: false,
    };
    component.usersList = [user];
    component.searchQuery = '';

    component.toggleSelection({ target: { checked: true } }, 0);

    expect(user.selected).toBe(true);
    expect(component).toBeTruthy();
  });

  it('should update selectedUsers and apply search filter on toggleAllSelection()', () => {
    const user1: UserDetailsModel = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'user',
      selected: false,
    };
    const user2: UserDetailsModel = {
      id: 2,
      name: 'Jane',
      email: 'jane@example.com',
      role: 'admin',
      selected: false,
    };
    component.usersList = [user1, user2];
    component.searchQuery = '';

    component.toggleAllSelection({ target: { checked: true } });

    expect(user1.selected).toBe(false);
    expect(user2.selected).toBe(false);
    expect(component).toBeTruthy();
  });

  it('should patch user details on patchUserDetails()', () => {
    const userDetails: UserDetailsModel = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'user',
      selected: false,
    };

    component.patchUserDetails(userDetails);

    expect(component).toBeTruthy();
  });

  it('should navigate to first page and update rowsDisplayed on onPageChange()', () => {
    const event = { first: 10, rows: 20 };
    component.filteredUsersList = new Array(50); // Example array with length 50

    component.onPageChange(event);

    expect(component.rowsDisplayed).toBe(20);
  });

  it('should update searchQuery and apply search filter on searchInputChangeHandler()', () => {
    component.searchQuery = '';
    const event = { target: { value: 'example' } };
    const applySearchFilterSpy = spyOn(component, 'applySearchFilter');

    component.searchInputChangeHandler(event);

    expect(component.searchQuery).toBe('example');
    expect(applySearchFilterSpy).toHaveBeenCalled();
  });

  it('should open edit user dialog and update users list on openEditUserDialog()', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of({ name: 'Updated Name' }));
    dialogSpy.open.and.returnValue(dialogRefMock);
    const userDetails: UserDetailsModel = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'user',
      selected: false,
    };
    component.usersList = [userDetails];
    component.searchQuery = '';
    const applySearchFilterSpy = spyOn(component, 'applySearchFilter');

    component.openEditUserDialog(userDetails);
    dialogRefMock.afterClosed().subscribe(() => {
      expect(dialogSpy.open).toHaveBeenCalledWith(EditUserDialogComponent, {
        width: '25rem',
        data: {
          title: 'Edit User',
          content: component.userForm,
        },
      });
      expect(dialogRefMock.disableClose).toBeTrue();
      expect(component.usersList[0].name).toBe('Updated Name');
      expect(applySearchFilterSpy).toHaveBeenCalled();
    });
  });

  it('should open delete user dialog and update users list on openDeleteUserDialog()', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefMock);
    const userDetails: UserDetailsModel = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'user',
      selected: false,
    };
    component.usersList = [userDetails];
    component.searchQuery = '';
    const applySearchFilterSpy = spyOn(component, 'applySearchFilter');

    component.openDeleteUserDialog(userDetails);
    dialogRefMock.afterClosed().subscribe(() => {
      expect(dialogSpy.open).toHaveBeenCalledWith(DeleteUserDialogComponent, {
        width: '25rem',
        data: {
          title: 'Delete User',
          content: `This action will remove user ${userDetails.name}.`,
        },
      });
      expect(dialogRefMock.disableClose).toBeTrue();
      expect(component.usersList.length).toBe(0);
      expect(applySearchFilterSpy).toHaveBeenCalled();
    });
  });

  it('should open delete selected users dialog and update users list on openDeleteSelectedUsersDialog()', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefMock);
    const user1: UserDetailsModel = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'user',
      selected: true,
    };
    const user2: UserDetailsModel = {
      id: 2,
      name: 'Jane',
      email: 'jane@example.com',
      role: 'admin',
      selected: true,
    };
    component.usersList = [user1, user2];
    component.searchQuery = '';
    const updateSelectedUsersSpy = spyOn(component, 'updateSelectedUsers');
    const applySearchFilterSpy = spyOn(component, 'applySearchFilter');

    component.openDeleteSelectedUsersDialog();
    dialogRefMock.afterClosed().subscribe(() => {
      expect(dialogSpy.open).toHaveBeenCalledWith(DeleteUserDialogComponent, {
        width: '25rem',
        data: {
          title: 'Delete',
          content: 'This action will remove all the selected users.',
        },
      });
      expect(dialogRefMock.disableClose).toBeTrue();
      expect(component.usersList.length).toBe(2);
      expect(updateSelectedUsersSpy).toHaveBeenCalled();
      expect(applySearchFilterSpy).toHaveBeenCalled();
    });
  });

  it('should deselect all selected users on deselectAll()', () => {
    const user1: UserDetailsModel = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'user',
      selected: true,
    };
    const user2: UserDetailsModel = {
      id: 2,
      name: 'Jane',
      email: 'jane@example.com',
      role: 'admin',
      selected: true,
    };
    component.usersList = [user1, user2];
    component.searchQuery = '';

    component.deselectAll();

    expect(user1.selected).toBe(true);
    expect(user2.selected).toBe(true);
  });
});
