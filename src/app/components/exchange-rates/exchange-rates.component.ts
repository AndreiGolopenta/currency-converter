import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DataBase } from '../../models/dataBase.interface';
import { Dropdown } from '../../models/dropdown.interface';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent {

  @Input()
  rateInput: string;

  @Input()
  data: DataBase[];

  @Input()
  dropdown: Dropdown;

  @Output()
  showHideList: EventEmitter<Dropdown> = new EventEmitter();

  @Output()
  searchValue: EventEmitter<string> = new EventEmitter();

  openDropdown(top: number) {
    this.dropdown.showList = !this.dropdown.showList;
    this.dropdown.topCorrection = top;
    this.dropdown.topPosition = `${window.innerHeight / 2 - top}px`;
    this.dropdown.leftPosition = `${window.innerWidth / 2 + 24}px`;
    this.dropdown.inputBinding = 3;
    this.dropdown.data = this.data;
    this.showHideList.emit(this.dropdown);
  }

  searchCurrency(value: string) {
    this.searchValue.emit(value);
  }

}
