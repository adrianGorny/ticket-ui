import { Station } from '@core/restapi/search';
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent {
  displayedColumns: string[] = ['select', 'stationName', 'stationCode'];
  selection = new SelectionModel<Station>(false, []);

  @Input() list: Station[];
  @Output() stationSelect = new EventEmitter<Station>();

  onStationSelect(station: Station) {
    this.selection.toggle(station);
    const selectValue = this.selection.isSelected(station) ? station : null;
    this.stationSelect.emit(selectValue);
  }
}
