import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[highlightOnHover]'
})
export class HighlightDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setHighlight(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setHighlight(false);
  }

  private setHighlight(shouldHighlight: boolean) {
    if (shouldHighlight) {
      this.renderer.addClass(this.elementRef.nativeElement, 'highlight');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'highlight');
    }
  }
}