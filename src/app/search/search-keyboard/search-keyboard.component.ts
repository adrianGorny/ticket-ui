import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-search-keyboard',
  templateUrl: './search-keyboard.component.html',
  styleUrls: ['./search-keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchKeyboardComponent {
  @Input() availableKeys: string[];
  @Output() keySelect = new EventEmitter<string>();
  @Output() backspaceSelect = new EventEmitter<void>();

  readonly keyboardLayout: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  isAvailable(key: string): boolean {
    return !!this.availableKeys
      ? this.availableKeys.some(letter => letter === key)
      : true;
  }

  onKeySelect(key: string) {
    this.keySelect.emit(key);
  }

  onBackspaceSelect() {
    this.backspaceSelect.emit();
  }
}
