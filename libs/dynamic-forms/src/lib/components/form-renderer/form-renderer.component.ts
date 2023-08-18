import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { FormControlBase } from '../../form_controls/form-control.base';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { DyFormBuilderService } from '../../services/form-builder.service';
import { Tag } from '../../models/core.model';
import { OperatorFunction } from 'rxjs';

@Component({
  selector: 'lib-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss'],
  providers: [DyFormBuilderService],
})
export class FormRendererComponent {

  @Input() dynamicFormGroup!: FormGroup;
  @Input() controls: FormControlBase<any>[] = [];
  @Input() typeaheadSearchFn!: OperatorFunction<string, readonly any[]>;
  @Input()
  typeaheadResultFormatterFn!: ((args: any) => string);
  @Input() mode = '';
  @Input() typeaheadTags: Tag[] = [];

  @Output() elementAdded: EventEmitter<FormControlBase<any>> = new EventEmitter();
  @Output() onSelectItemEvent: EventEmitter<NgbTypeaheadSelectItemEvent<any>> = new EventEmitter();
  @Output() tagRemoved = new EventEmitter<Tag>();

  // form: FormGroup;
  payLoad = '';
  jsonPayload: SafeHtml = '';
  closeResult: string | undefined;
  formElements: FormControlBase<any>[] = [];

  constructor(private _dyDyFormBuilderService: DyFormBuilderService, private router: Router, private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  // public navigate(): void {
  //   this.router.navigate(['/home']);
  // }

  // save() {
  //   console.log(this.form.value);
  // }

  public showJsonSchema() {
    const json: string[] = [];
    this.formElements.forEach((control) => {
      json.push(control.toJson());
    });
    const str = '[ <br>' + json.join(',<br>') + '<br>]';
    this.jsonPayload = this.sanitizer.bypassSecurityTrustHtml(str);
  }

  // onSubmit() {
  //   // this.payLoad = JSON.stringify(this.form.value);
  //   this.payLoad = JSON.stringify(this.dynamicFormGroup.value);
  // }

  // open(content) {
  //   const json = [];
  //   this.controls.forEach((control) => {
  //     json.push(control.toJson());
  //   });
  //   const str = '[ <br>' + json.join(',<br>') + '<br>]';
  //   this.jsonPayload = this.sanitizer.bypassSecurityTrustHtml(str);
  //   this.modalService.open(content);
  // }

  public handleSubs(event: FormControlBase<any> | undefined) {
    this.dynamicFormGroup = this._dyDyFormBuilderService.toFormGroup(this.formElements);
    this.elementAdded.emit(event);
  }

  selectItemEvent(event: NgbTypeaheadSelectItemEvent<any>) {
    this.onSelectItemEvent.emit(event);
  }

  onTagRemoved(tag: Tag) {
    this.tagRemoved.emit(tag);
  }
}
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
