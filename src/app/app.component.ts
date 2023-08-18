import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlBase, DyFormBuilderService } from 'dynamic-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = "ets";
  MPDRequestTrackingFormJson: Array<never> = [];
  MPDRequestTrackingFormGroup!: FormGroup;
  MPDRequestTrackingFormElements: FormControlBase<any>[] = [];

  constructor(private _dyFormBuilderService: DyFormBuilderService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<Array<never>>('assets/1.json').subscribe((formJson1Content) => {
      this.MPDRequestTrackingFormJson = formJson1Content;
      this.MPDRequestTrackingFormElements = this._dyFormBuilderService.convertToFormControlBase(this.MPDRequestTrackingFormJson);
      this.MPDRequestTrackingFormGroup = this._dyFormBuilderService.toFormGroup(this.MPDRequestTrackingFormElements);
      console.log(formJson1Content);
    });
  }
}
