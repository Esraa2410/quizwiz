import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IBreadCrumb } from '../../models/shared';
import { gsap } from 'gsap';
@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent {
  @ViewChild('ol', { static: true }) orderedList!: ElementRef<HTMLElement>
  @ViewChild('button', { static: true }) button!: ElementRef<HTMLButtonElement>
  @Input() breadCrumbs: IBreadCrumb[] = [];
  @Input() btnText: string = '';
  @Input() btnIcon: string = '';
  @Output() btnEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() btnVisibility: boolean = true;

  openAddDialog() {
    this.btnEvent.emit();
  }

  ngAfterViewInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    const list = this.orderedList.nativeElement.children;

    gsap.from(list, {
      delay: 0.6,
      duration: 0.4,
      opacity: 0,
      y: -60,
      stagger: 0.2,
    });

    if (this.button) {
      const btn = this.button.nativeElement;
      gsap.from(btn, {
        delay: 1.2,
        duration: 0.4,
        opacity: 0,
        y: -60,
        stagger: 0.2,
      });
    }
  }
}
