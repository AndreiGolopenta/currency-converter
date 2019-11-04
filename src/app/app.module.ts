import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// containers
import { CurrencyConverterComponent } from './containers/currency-converter/currency-converter.component';

// components
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import { InputListComponent } from './components/input-list/input-list.component';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';
import { InfoCardComponent } from './components/info-card/info-card.component';

// directive
import { InputFormatDirective } from './directives/input-format.directive';

// pipe
import { DecimalPipe } from './components/exchange-rates/decimal.pipe';
 
@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyFormComponent,
    InputListComponent,
    ExchangeRatesComponent,
    InfoCardComponent,
    InputFormatDirective,
    DecimalPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
