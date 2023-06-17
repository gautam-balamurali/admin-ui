import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AdminUiComponent } from './admin-ui/admin-ui.component';
import { EditUserDialogComponent } from './admin-ui/edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './admin-ui/delete-user-dialog/delete-user-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './admin-ui/users-list/users-list.component';

@NgModule({
  declarations: [
    AdminUiComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class FeaturesModule {}
