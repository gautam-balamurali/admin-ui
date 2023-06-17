import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';

import { UsersService } from 'src/app/core/services/users-service/users.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.scss'],
})
export class AdminUiComponent implements OnInit {
  userForm: FormGroup;

  usersList: any[] = [];
  selectedUsers: any[] = [];
  filteredUsersList: any[] = [];

  rowsDisplayed: number = 0;
  first: number = 0;
  rows: number = 10;

  searchQuery: string = '';

  @ViewChild('table', { static: false }) table: Table;

  constructor(
    public usersService: UsersService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsersList();
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  /**
   * Gets users list
   */
  getUsersList() {
    this.usersService.getUsersListService().subscribe({
      next: (response: any) => {
        console.log({ response });
        this.usersList = response;
        this.filteredUsersList = [...this.usersList];
        const firstRow = 0;
        const lastRow = Math.min(this.table?.rows, this.usersList.length);
        this.rowsDisplayed = lastRow - firstRow;
      },
      error: (error) => {
        console.error({ error });
      },
      complete: () => {
        console.log('Observable stream completed');
        // Perform any necessary cleanup or finalization tasks here
        // Update UI elements, reset flags, etc.
      },
    });
  }

  /**
   * Toggles selection
   * @param event
   * @param id
   */
  toggleSelection(event: any, index: any) {
    this.usersList[index].selected = event.target.checked;
    this.updateSelectedUsers();
  }

  /**
   * Toggles all selection
   * @param event
   */
  toggleAllSelection(event: any) {
    const isChecked = event.target.checked;
    if (this.table) {
      const first = this.table.first ?? 0;
      const last = first + this.rowsDisplayed;
      for (let i = first; i < last; i++) {
        this.usersList[i].selected = isChecked;
      }
    }
    this.updateSelectedUsers();
  }

  /**
   * Updates selected users
   */
  updateSelectedUsers() {
    this.selectedUsers = this.usersList.filter((user) => user.selected);
    this.applySearchFilter(this.searchQuery);
  }

  /**
   * Determines whether page change on
   * @param event
   */
  onPageChange(event) {
    const firstRow = event.first;
    const lastRow = event.first + event.rows;
    const totalRecords = this.filteredUsersList.length;
    this.rowsDisplayed = Math.min(lastRow, totalRecords) - firstRow;
  }

  /**
   * Determines whether all checked is
   * @returns boolean
   */
  isAllChecked() {
    const first = this.table?.first ?? 0;
    const last = first + this.rowsDisplayed;
    const displayedUsers = this.table?.value.slice(first, last) ?? [];
    return (
      this.selectedUsers.length > 0 &&
      displayedUsers.every((element) => this.selectedUsers.includes(element))
    );
  }
  /**
   * Patchs user details
   * @param userDetails
   */
  patchUserDetails(userDetails) {
    const { name, email, role } = userDetails;
    this.userForm.patchValue({
      name,
      email,
      role,
    });
  }

  /**
   * Opens edit user dialog
   * @param userDetails
   */
  openEditUserDialog(userDetails): void {
    this.patchUserDetails(userDetails);
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '25rem',
      data: {
        title: 'Edit User',
        content: this.userForm,
      },
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((updatedUserDetails) => {
      if (updatedUserDetails) {
        const updatedUsersList = this.usersList.map((user) =>
          user.id === userDetails.id ? { ...user, ...updatedUserDetails } : user
        );
        this.usersList = [...updatedUsersList];
        this.applySearchFilter(this.searchQuery);
      }
    });
  }

  /**
   * Opens delete user dialog
   * @param selectedUsersDetails
   */
  openDeleteUserDialog(userDetails): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '25rem',
      data: {
        title: 'Delete User',
        content: `This action will remove ${userDetails.name}.`,
      },
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((proceed) => {
      if (proceed) {
        const updatedUsersList = this.usersList.filter(
          (user) => user.id !== userDetails.id
        );
        this.usersList = [...updatedUsersList];
        this.applySearchFilter(this.searchQuery);
      }
    });
  }

  /**
   * Opens delete selected users dialog
   */
  openDeleteSelectedUsersDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '25rem',
      data: {
        title: 'Delete',
        content: 'This action will remove all the selected users.',
      },
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((proceed) => {
      if (proceed) {
        const selectedUsersIds = this.selectedUsers.map((user) => user.id);
        const updatedUsersList = this.usersList.filter(
          (user) => !selectedUsersIds.includes(user.id)
        );
        this.usersList = [...updatedUsersList];
        this.updateSelectedUsers();
        this.applySearchFilter(this.searchQuery);
      }
    });
  }

  /**
   * Search input change handler
   * @param event
   */
  searchInputChangeHandler(event) {
    this.searchQuery = event.target.value.toLowerCase().trim();
    this.applySearchFilter(this.searchQuery, true);
  }

  /**
   * Applies search filter
   * @param query
   */
  applySearchFilter(query, goToFirstPage?: boolean) {
    if (query === '') {
      this.filteredUsersList = [...this.usersList];
    } else {
      this.filteredUsersList = this.usersList.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      );
    }
    if (goToFirstPage) {
      this.table.first = 0;
      this.onPageChange({ first: 0, rows: this.rows });
    }
  }
/**
 * Deselects all selected users
 */
deselectAll() {
    const updatedUsersList = this.usersList.map((user) =>
      user.selected ? { ...user, selected: false } : user
    );
    this.usersList = [...updatedUsersList];
    this.updateSelectedUsers();
  }
}
