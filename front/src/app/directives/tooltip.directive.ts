import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string;
  tooltipElement: HTMLElement;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.tooltipElement = document.createElement('span');
      this.tooltipElement.textContent = this.tooltipText;

      // Adjusting the tooltip styles
      this.tooltipElement.style.position = 'absolute';
      this.tooltipElement.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
      this.tooltipElement.style.color = '#fff';
      this.tooltipElement.style.padding = '3px 8px';
      this.tooltipElement.style.borderRadius = '4px';
      this.tooltipElement.style.fontSize = '12px';
      this.tooltipElement.style.whiteSpace = 'nowrap';

      // Position the tooltip just above the icon
      const rect = this.el.nativeElement.getBoundingClientRect();
      this.tooltipElement.style.top = `${rect.top - 30 }px`; // Position it above the element
      this.tooltipElement.style.left = `${rect.left + (rect.width / 2) - 60}px`; // Center it horizontally
      this.tooltipElement.style.zIndex = '1000';
      this.tooltipElement.style.pointerEvents = 'none'; // Prevent the tooltip from blocking mouse events

      document.body.appendChild(this.tooltipElement);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
