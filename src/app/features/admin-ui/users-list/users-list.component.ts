import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { UserDetailsModel } from 'src/app/models/user-details.model';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Input() usersList: UserDetailsModel[] = [];
  @Input() filteredUsersList: UserDetailsModel[] = [];
  @Input() searchQuery: string = '';
  @Output() refreshListClickEvent: EventEmitter<void> =
    new EventEmitter<void>();

  userForm: FormGroup;

  selectedUsers: UserDetailsModel[] = [];

  first: number = 0;
  rows: number = 10;
  rowsDisplayed: number = 0;

  usersServiceSubscription: Subscription;

  @ViewChild('table', { static: false }) table: Table;

  constructor(public formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  calculateRowsToBeDisplayed(listLength: number) {
    const firstRow = 0;
    const lastRow = Math.min(this.table?.rows ?? this.rows, listLength);
    this.rowsDisplayed = lastRow - firstRow;
  }

  getUsersList() {
    this.refreshListClickEvent.emit();
  }

  /**
   * Toggles selection
   * @param event
   * @param id
   */
  toggleSelection(event: any, index: number) {
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
  patchUserDetails(userDetails: UserDetailsModel) {
    const { name, email, role } = userDetails;
    this.userForm.patchValue({
      name,
      email,
      role,
    });
  }

  /**
   * Determines whether page change on
   * @param event
   */
  onPageChange(event: any) {
    const firstRow = event.first;
    const lastRow = event.first + event.rows;
    const totalRecords = this.filteredUsersList.length;
    this.rowsDisplayed = Math.min(lastRow, totalRecords) - firstRow;
  }

  /**
   * Search input change handler
   * @param event
   */
  searchInputChangeHandler(event: any) {
    this.searchQuery = event.target.value.toLowerCase().trim();
    this.applySearchFilter(this.searchQuery, true);
  }

  /**
   * Applies search filter
   * @param query
   */
  applySearchFilter(query: string, goToFirstPage?: boolean) {
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
    if (goToFirstPage) this.table.first = 0;
    this.onPageChange({ first: 0, rows: this.rows });
  }

  /**
   * Opens edit user dialog
   * @param userDetails
   */
  openEditUserDialog(userDetails: UserDetailsModel): void {
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
  openDeleteUserDialog(userDetails: UserDetailsModel): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '25rem',
      data: {
        title: 'Delete User',
        content: `This action will remove user ${userDetails.name}.`,
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
