import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
//import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { FormControlBase } from '../../form_controls/form-control.base';
import { Tag } from '../../models/core.model';
import { OperatorFunction } from 'rxjs';

@Component({
  selector: 'lib-elements-renderer',
  templateUrl: './elements-renderer.component.html',
  styleUrls: ['./elements-renderer.component.scss']
})
export class ElementsRendererComponent {
  // private signaturePadOptions = {
  //   minWidth: 2,
  //   canvasWidth: 0,
  //   canvasHeight: 0
  // };
  @Input() control!: FormControlBase<any>;
  @Input() layoutClass: any;
  @Input() dynamicFormGroup!: FormGroup;
  // @Input() form: FormGroup;
  @Input() typeaheadSearchFn!: OperatorFunction<string, readonly any[]> ;
  @Input() typeaheadResultFormatterFn!: ((args: any) => string);
  @Input() typeaheadTags:Tag[] = [];
  /// @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Output() elementAdded: EventEmitter<FormControlBase<any>> = new EventEmitter();
  @Output() focusOutEvt: EventEmitter<FormControlBase<any>> = new EventEmitter();
  @Output() selectModelChange: EventEmitter<string> = new EventEmitter();
  @Output() onSelectItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() tagRemoved = new EventEmitter<Tag>();


  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing');
  }


  handleSubElements(event: FormControlBase<any>) {
    if (this.control.type !== 'tabs') {
      this.control.subComponents = this.control.subComponents.concat([event]);
    }
    this.elementAdded.emit(event);
  }

  onFocusOutFn(control: FormControlBase<any>) {
    this.focusOutEvt.emit(control);
  }

  onSelectChange(evt: string | undefined) {
    this.selectModelChange.emit(evt);
  }

  selectItem(event: NgbTypeaheadSelectItemEvent<any>, input: { value: string; }) {
    
    this.onSelectItemEvent.emit(event);
    // this.tagInputText = '';
    input.value = '';
    event.preventDefault();
  }
}
