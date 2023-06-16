import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AdminUiComponent } from './features/admin-ui/admin-ui.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-ui',
        pathMatch: 'full',
      },
      {
        path: 'admin-ui',
        component: AdminUiComponent,
      },
      {
        path: '**',
        redirectTo: 'admin-ui',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
