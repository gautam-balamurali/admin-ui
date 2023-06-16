import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AdminUiComponent } from './admin-ui/admin-ui.component';

@NgModule({
  declarations: [AdminUiComponent],
  imports: [CommonModule, TableModule, ButtonModule],
})
export class FeaturesModule {}
