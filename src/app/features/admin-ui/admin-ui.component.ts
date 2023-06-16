import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { UsersService } from 'src/app/core/services/users-service/users.service';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.scss'],
})
export class AdminUiComponent implements OnInit {
  usersList: any[] = [];
  selectedUsers: any[] = [];

  rowsDisplayed: number = 0;

  first = 0;
  rows = 10;

  @ViewChild('table', { static: false }) table: Table;

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.usersService.getUsersListService().subscribe({
      next: (response: any) => {
        console.log({ response });
        this.usersList = response;
        const firstRow = 0;
        const lastRow = Math.min(this.table.rows, this.usersList.length);

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

  toggleSelection(event: any, id: any) {
    this.usersList[id - 1].selected = event.target.checked;
    this.updateSelectedUsers();
  }

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

  updateSelectedUsers() {
    this.selectedUsers = this.usersList.filter((user) => user.selected);
  }

  onPageChange(event) {
    const firstRow = event.first;
    const lastRow = event.first + event.rows;
    const totalRecords = this.usersList.length;
    this.rowsDisplayed = Math.min(lastRow, totalRecords) - firstRow;
  }

  isAllChecked() {
    const first = this.table?.first ?? 0;
    const last = first + this.rowsDisplayed;
    const displayedUsers = this.table?.value.slice(first, last) ?? [];

    return displayedUsers.every((element) =>
      this.selectedUsers.includes(element)
    );
  }
}
