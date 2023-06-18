import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, ButtonModule],
  exports: [SearchBarComponent],
})
export class SharedModule {}
