import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/core/services/users-service/users.service';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.scss'],
})
export class AdminUiComponent implements OnInit {
  users: any[] = [];

  first = 0;

  rows = 10;

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.usersService.getUsersListService().subscribe({
      next: (response:any) => {
        console.log({ response });
        this.users = response
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
}
