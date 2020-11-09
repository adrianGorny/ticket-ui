import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchHeaderComponent {
  @Input() queryString: string;
  @Output() clearQuery = new EventEmitter<void>();

  onClear() {
    this.clearQuery.emit();
  }
}
