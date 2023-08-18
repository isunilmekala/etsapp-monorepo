import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DyFormBuilderService, FormControlBase } from 'dynamic-forms';

@Component({
  selector: 'bpcm-component',
  templateUrl: './bpcm-component.component.html',
  styleUrls: ['./bpcm-component.component.scss'],
})
export class BpcmComponentComponent implements OnInit {

  title = "ets";
  MPDRequestTrackingFormJson: Array<never> = [];
  MPDRequestTrackingFormGroup!: FormGroup;
  MPDRequestTrackingFormElements: FormControlBase<any>[] = [];

  constructor(private _dyFormBuilderService: DyFormBuilderService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<Array<never>>('assets/pbpp_supplement.json').subscribe((formJson1Content) => {
      this.MPDRequestTrackingFormJson = formJson1Content;
      this.MPDRequestTrackingFormElements = this._dyFormBuilderService.convertToFormControlBase(this.MPDRequestTrackingFormJson);
      this.MPDRequestTrackingFormGroup = this._dyFormBuilderService.toFormGroup(this.MPDRequestTrackingFormElements);
      console.log(formJson1Content);
    });
  }
}
