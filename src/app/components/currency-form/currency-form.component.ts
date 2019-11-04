import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormValue } from '../../models/form-value.interface';
import { Dropdown } from '../../models/dropdown.interface';
import { InputValue } from '../../models/input-value.interface';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss'],
})
export class CurrencyFormComponent {

  @Input()
  dropdown: Dropdown;

  @Input()
  conversionResult: string[];

  @Input()
  inputValue: InputValue;

  @Output()
  showHideList: EventEmitter<Dropdown> = new EventEmitter();

  @Output()
  searchValue: EventEmitter<string> = new EventEmitter();

  @Output()
  formData: EventEmitter<FormValue> = new EventEmitter();

  @Output()
  swapInputValue: EventEmitter<InputValue> = new EventEmitter();

  displayList(top: number, inputNr: number) {
    this.dropdown.showList = !this.dropdown.showList;
    this.dropdown.topCorrection = top;
    this.dropdown.topPosition = `${window.innerHeight / 2 - top}px`
    this.dropdown.leftPosition = `${window.innerWidth / 2 + 24}px`;
    this.dropdown.inputBinding = inputNr;
    this.showHideList.emit(this.dropdown)
  }

  searchCurrency(value: string) {
    this.searchValue.emit(value);
  }

  handleSubmit(value: FormValue) {
    this.formData.emit(value);
  }

  swapValue() {
    this.swapInputValue.emit(this.inputValue);
  }
}
