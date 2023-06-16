import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AdminUiComponent } from './features/admin-ui/admin-ui.component';
import { RouteConstants } from './config/route-constants';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: RouteConstants.ROUTES.HOME,
        pathMatch: 'full',
      },
      {
        path: RouteConstants.ROUTES.HOME,
        component: AdminUiComponent,
      },
      {
        path: '**',
        redirectTo: RouteConstants.ROUTES.HOME,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
