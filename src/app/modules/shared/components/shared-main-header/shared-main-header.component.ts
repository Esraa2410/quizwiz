import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-main-header',
  templateUrl: './shared-main-header.component.html',
  styleUrls: ['./shared-main-header.component.scss']
})
export class SharedMainHeaderComponent {
  @Input() navigationLink: string = '';
  @Input() navigationText: string = '';
  @Input() headerText: string = '';
  @Input() navigationVisibility: boolean = false;
}
