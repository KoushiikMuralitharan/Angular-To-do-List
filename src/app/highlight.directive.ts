import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() appHighlight = '';
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.highlight(this.appHighlight || 'yellow')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: String) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
