import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Dropdown } from '../../models/dropdown.interface';

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss'],
})
export class InputListComponent {
  
  @Input()
  dropdown: Dropdown;

  @Input()
  errorMessage: boolean;

  @Output()
  selectedCurrency: EventEmitter<string> = new EventEmitter();

  constructor() {}

  selectCurrency(value: string) {
    this.selectedCurrency.emit(value);
  }
}
