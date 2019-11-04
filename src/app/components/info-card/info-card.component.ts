import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {

  btnActive: boolean = true;

  @Output()
  animationTrigger: EventEmitter<boolean> = new EventEmitter();

  showConverter() {
    this.animationTrigger.emit(false);
    this.btnActive = true;
  }

  showRates() {
    this.animationTrigger.emit(true);
    this.btnActive = false;
  }

}
