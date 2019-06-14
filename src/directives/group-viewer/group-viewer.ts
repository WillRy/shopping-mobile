import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';

@Directive({
  selector: '[groupViewer]' // Attribute selector
})
export class GroupViewerDirective {


  constructor(private elementRef: ElementRef) {

  }


  @Input()
  set groupViewer(viewed: boolean) {
    setTimeout(()=>{
      const nativeElement: HTMLElement = this.elementRef.nativeElement;
      viewed ? nativeElement.style.fontWeight = 'normal' : nativeElement.style.fontWeight = 'bold';
    }, 500);
  }
}
