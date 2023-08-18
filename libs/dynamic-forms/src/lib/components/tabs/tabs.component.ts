import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormControlBase } from '../../form_controls/form-control.base';

@Component({
  selector: 'lib-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() control!: FormControlBase<any>;
  // @Output() elementAdded: EventEmitter<FormControlBase<any>> = new EventEmitter();
  // @Input() form!: FormGroup;
  public count = 1;

  // public handleSubElements(event) {
  //   this.elementAdded.emit(event);
  // }
}
