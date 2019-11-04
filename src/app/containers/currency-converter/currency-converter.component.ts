import { Component, OnInit } from '@angular/core';

import { CurrencyConverterService } from '../../services/currency-converter.service';

import { ExchangeRates } from '../../models/exchangeRates.interface';
import { Country } from '../../models/country.interface';
import { DataBase } from '../../models/dataBase.interface';
import { FormValue } from '../../models/form-value.interface';
import { SymbolBaseConvert } from '../../models/symbol-base-convert.interface';
import { Dropdown } from '../../models/dropdown.interface';
import { InputValue } from '../../models/input-value.interface';
 
import { moveLeftRight } from '../../animations/animation';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  animations: [moveLeftRight]
})
export class CurrencyConverterComponent implements OnInit {
  
  db: DataBase[];
  dataClone: DataBase[];
  dataFromForm: FormValue;

  dropdown: Dropdown = {
    showList: false,
    topPosition: '',
    topCorrection: 0,
    leftPosition: '',
    height: '229px',
    inputBinding: null,
    data: null
  }

  inputValue: InputValue = {
    localCurrencyValue: '',
    currencyConversionValue: '',
    conversionValue: null
  };

  errorMessage: boolean = true;
  conversionResult: string[] = [];
  rateInput: string = 'EUR';
  animation: boolean = false;
  

  constructor(private currencyConverterService: CurrencyConverterService) {}

  ngOnInit() {
    this.showRates('EUR');
    this.dropdown.data = this.db;
  
    window.addEventListener('click', event => {
      const container = document.querySelector('.list-container');
      if (event.target === container) {
        this.resetInputValue();
      }
    });

    window.addEventListener('resize', () => {
      this.dropdown.leftPosition = `${window.innerWidth / 2 + 24}px`;
      this.dropdown.topPosition = `${window.innerHeight / 2 - this.dropdown.topCorrection}px`;
    });
  }

  showRates(base: string) {
    this.db = [];
    const euro: DataBase = {
      country: 'Europe',
      flag: 'https://www.sfcg.org/wp-content/uploads/2015/09/European-Union-Flag.png',
      currenciesCode: 'EUR',
      rate: 1
    }
    this.currencyConverterService
      .getRages(base)
      .subscribe((data1: ExchangeRates) => {
        for (let el in data1.rates) {
          const countryCode: string = el.slice(0, 2);
          if (countryCode !== 'EU') {
            this.currencyConverterService
              .getFlag(countryCode)
              .subscribe((data2: Country) => {
                const obj: DataBase = {
                  country: data2.name,
                  flag: data2.flag,
                  currenciesCode: data2.currencies[0]['code'],
                  rate: data1.rates[el]
                };
                this.db.push(obj);
              });
          } else {
            euro.rate = data1.rates[el];
          }
        }
      });

    this.db = [euro, ...this.db];
  }

  resetInputValue() {
    const input3 = document.querySelector('#rates') as HTMLInputElement;
    if (this.errorMessage) {
      this.dropdown.showList = !this.dropdown.showList;
      switch (this.dropdown.inputBinding) {
        case 1:
          this.inputValue.localCurrencyValue = '';
          this.filterData(this.inputValue.currencyConversionValue.toUpperCase());
          break;
        case 2:
          this.inputValue.currencyConversionValue = '';
          this.filterData(this.inputValue.localCurrencyValue.toUpperCase());
          break;
        case 3:
          this.rateInput = 'EUR';
          input3.value = 'EUR';
      }
    } else {
      switch (this.dropdown.inputBinding) {
        case 1:
          this.selectCurrencyFromList(this.inputValue.localCurrencyValue.toUpperCase());
          break;
        case 2:
          this.selectCurrencyFromList(this.inputValue.currencyConversionValue.toUpperCase());
          break;
        case 3: 
          if (input3.value.length < 3) {
            this.rateInput = 'EUR';
            input3.value = 'EUR';
            this.dropdown.showList = !this.dropdown.showList;
          } else {
            this.selectCurrencyFromList(input3.value);
            break;
          } 
      }
    }
  }

  setUlHeight() {
    if (this.dropdown.data.length < 6) {
      this.dropdown.height = 'auto';
    } else {
      this.dropdown.height = '229px';
    }
  }

  handleList(event: Dropdown) {
    this.dropdown = Object.assign({}, this.dropdown, event);
    this.dataClone = [...this.dropdown.data];
    this.setUlHeight();
  }

  handleSearch(value: string) {
    this.dropdown.data = this.dataClone.filter((data: DataBase) => {
      return data.currenciesCode.includes(value.toUpperCase());
    });
    this.setUlHeight();
    this.dropdown.data.length === 0 ? this.errorMessage = true : this.errorMessage = false;
  }

  handleSubmit(value: FormValue) {
    this.dataFromForm = value;
    const val1 = value.localCurrency.toUpperCase();
    const val2 = value.currencyConversion.toUpperCase();
    this.currencyConverterService
      .getConversion(val1, val2)
      .subscribe((data: SymbolBaseConvert) => {
        const rate = data.rates[val2] * 1e10;
        const result = (rate * value.conversionValue) / 1e10;
        this.conversionResult = [
          `${result.toFixed(4)} ${val2}`,
          data.date,
        ];
      });
  }

  handleAnimation(value: boolean) {
    this.animation = value;
    if (!value) {
      this.conversionResult = [];
      this.dropdown.data = this.db;
      this.dataFromForm = null;
      this.inputValue .localCurrencyValue = '';
      this.inputValue.currencyConversionValue = '';
      this.inputValue.conversionValue = null;
    }
  }

  selectCurrencyFromList(value: string) {
    this.dropdown.showList = !this.dropdown.showList;
    switch(this.dropdown.inputBinding) {
      case 1:
        this.inputValue.localCurrencyValue = value;
        this.filterData(value);
        break;
      case 2:
        this.inputValue.currencyConversionValue = value;
        this.filterData(value);
        break;
      case 3:
        this.rateInput = value;
        this.showRates(value);
        break;
    }
  }

  filterData(value: string) {
    this.dropdown.data = this.db.filter((data: DataBase) =>{
      return data.currenciesCode !== value;
    });
    this.setUlHeight();
    this.dataClone = [...this.dropdown.data];
  }

  handleSwap(value: InputValue) {
    const backUp = value.localCurrencyValue;
    this.inputValue.localCurrencyValue = value.currencyConversionValue;
    this.inputValue.currencyConversionValue = backUp;
  }
}
