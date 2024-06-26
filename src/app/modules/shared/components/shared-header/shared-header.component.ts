import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss']
})
export class SharedHeaderComponent {
 @Input() btnText:string ='';
 @Input() btnIcon:string =''
@Output() btnEvent :EventEmitter<any>= new EventEmitter<any>();

openAddDialog(){
  this.btnEvent.emit();
}

}
