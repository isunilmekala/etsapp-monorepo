import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FormControlBase } from '../form_controls/form-control.base';
import { IOption } from '../models/core.model';

@Injectable({
  providedIn: 'root',
})
export class DyFormBuilderService {
  constructor(private http: HttpClient) { }

  public toFormGroup(formControls: FormControlBase<any>[]) {
    const group: any = {};

    formControls.forEach((control) => {
      //  console.log(JSON.stringify( control));
      if (control.getControlType() === 'layout') {
        group[control.key] = this.toFormGroup(control.subComponents);
      } else {
        const requiredValidations: Array<any> = [];
        if (control.remote_choices_url && control.remote_choices_url !== '') {
          this.getRemoteOptions(control.remote_choices_url).subscribe((data) => {
            control.choices = data;
          });
        }

        if (control.remote_data_url && control.remote_data_url !== '') {
          this.getRemoteOptions(control.remote_data_url).subscribe((data) => {
            control.remoteSelectOptions = data;
          });
        }
        if (control.options && control.options.tableColumnsRemoteUrl && control.options.tableColumnsRemoteUrl !== '') {
          this.getRemoteOptions(control.options.tableColumnsRemoteUrl).subscribe((data: any) => {
            control.tableCols = data.length || 0;
            control.tableColumnOptions = data || [];
          });
        }
        if (control.options && control.options.tableDataRemoteUrl && control.options.tableDataRemoteUrl !== '') {
          this.getRemoteOptions(control.options.tableDataRemoteUrl).subscribe((data: any) => {
            control.tableRows = data.length || 0;
            control.tableRowData = data || [];
          });
        }
        if (control.validations && control.validations.required) {
          requiredValidations.push(Validators.required);
        }
        if (control.validations && control.validations.min_length) {
          requiredValidations.push(Validators.minLength(control.validations.min_length));
        }
        if (control.validations && control.validations.max_length) {
          requiredValidations.push(Validators.maxLength(control.validations.max_length));
        }
        if (control.validations && control.validations.pattern !== '') {
          requiredValidations.push(Validators.pattern(control.validations.pattern));
        }

        // if (control.validations && control.validations.validateEmail !== '') {
        //     requiredValidations.push(EmailValidatorDirective);
        // }
        if (requiredValidations.length > 0) {
          group[control.key] = new FormControl(control.value || '', {
            updateOn: control.triggerOn,
            validators: requiredValidations
            
          })
        }else {
          group[control.key] = new FormControl(control.value || '');
        }
        // group[control.key] = requiredValidations.length > 0 ? new FormControl(control.value || '', requiredValidations) : 
        // new FormControl(control.value || '');

        if (control.disable) {
          group[control.key].disable();
        }
      }
    });
    return new FormGroup(group);
  }

  convertToFormControlBase(inputArray = []) {
    const controls: Array<FormControlBase<any>> = [];
    inputArray.forEach(record => controls.push(new FormControlBase(record)));
    return controls;
  }

  public validateEmail(email: string): { validateEmail: { valid: boolean; }; } | null {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return EMAIL_REGEXP.test(email)
      ? null
      : {
        validateEmail: {
          valid: false,
        },
      };
  }

  getRemoteOptions(url: string): Observable<IOption[]> {
    return this.http.get(url).pipe(map((response: any) => {
      const options = response || [];
      return options;
    }));
  }
}
