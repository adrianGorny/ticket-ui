import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-keyboard',
  templateUrl: './search-keyboard.component.html',
  styleUrls: ['./search-keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchKeyboardComponent {
  @Output() keySelect = new EventEmitter<string>();
  @Output() backspaceSelect = new EventEmitter<void>();
  readonly keyboardLayout: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  onKeySelect(key: string) {
    this.keySelect.emit(key);
  }

  onBackspaceSelect() {
    this.backspaceSelect.emit();
  }
}
