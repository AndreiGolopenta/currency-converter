import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFormat]',
})
export class InputFormatDirective {

  @HostListener('input', ['$event'])
  inputFormat(event: KeyboardEvent) {
    
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}
