import { trigger, state, style, transition, animate } from '@angular/animations';

export const moveLeftRight = 
  trigger('startAnimation', [
    state('initial', style({
      left: 0
    })),
    state('final', style({
      left: '-350px'
    })),
    transition('initial <=> final', [
      animate('300ms ease-in-out')
    ])
  ]);