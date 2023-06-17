import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() placeholder: string;

  @Output() searchQueryChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() refreshListClick: EventEmitter<void> = new EventEmitter<void>();

  searchQuery: string = '';

  searchInputChangeHandler(event: any) {
    this.searchQuery = event.target.value;
    this.searchQueryChange.emit(event);
  }

  refreshList() {
    this.refreshListClick.emit();
    this.searchQuery = '';
  }
}
