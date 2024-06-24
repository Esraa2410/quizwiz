import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss']
})
export class SharedHeaderComponent {
 @Input() btnText:string ='';
 @Input() btnIcon:string =''
 //@Input() Link:string='' ;
}
