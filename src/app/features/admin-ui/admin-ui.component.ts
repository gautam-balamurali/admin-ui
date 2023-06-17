import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { UsersService } from 'src/app/core/services/users-service/users.service';
import { UserDetailsModel } from 'src/app/models/user-details.model';
import { Subscription } from 'rxjs';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.scss'],
})
export class AdminUiComponent implements OnInit, OnDestroy {
  usersList: UserDetailsModel[] = [];
  filteredUsersList: UserDetailsModel[] = [];

  searchQuery: string = '';

  usersServiceSubscription: Subscription;

  @ViewChild('table', { static: false }) table: Table;
  @ViewChild('usersListReference')
  usersListReference: UsersListComponent;

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  /**
   * Gets users list
   */
  getUsersList() {
    this.usersServiceSubscription = this.usersService
      .getUsersListService()
      .subscribe({
        next: (response: UserDetailsModel[]) => {
          this.usersList = response;
          this.filteredUsersList = [...this.usersList];
          this.usersListReference.calculateRowsToBeDisplayed(
            this.usersList.length
          );
        },
        error: (error) => {
          console.error({ error });
        },
      });
  }

  ngOnDestroy(): void {
    this.usersServiceSubscription.unsubscribe();
  }
}
