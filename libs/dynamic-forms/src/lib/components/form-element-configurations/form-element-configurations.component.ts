import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControlBase } from '../../form_controls/form-control.base';
import { FormElementOptions } from '../../form_controls/form-element-options';
import { IFormElementOptions, IMap } from '../../models/core.model';

@Component({
  selector: 'lib-form-element-configurations',
  templateUrl: './form-element-configurations.component.html',
  styleUrls: ['./form-element-configurations.component.scss']
})
export class FormElementConfigurationsComponent implements AfterViewInit {
  @Input() element!: FormControlBase<any>;
  @Output() saved: EventEmitter<string> = new EventEmitter();

  public isEditMode = false;
  public isTabcount = false;
  public hideTabEditElements = true;
  public hideTabsEditElements = true;

  ngAfterViewInit() {
    if (this.element.type == 'tabs') {
      this.isTabcount = true;
      // this.hideTabEditElements = false;
      this.hideTabsEditElements = false;
    }
    if (this.element.type == 'tab') {
      this.hideTabsEditElements = false;
    }
    if (this.element.type === 'directions') {
      this.hideTabEditElements = false;
      this.hideTabsEditElements = false;
    }
  }

  public saveConfig() {
    this.isEditMode = false;
    this.saved.emit('saved');
  }

  public tabsInc() {
    const oldCount = this.element.subComponents.length;
    const arr = [];

    for (let i = 1; i <= this.element.tabsCount; i++) {
      const obj = {
        key: 'Tab' + i,
        type: 'tab',
        label: 'Tab ' + i,
      };
      const eleOptions: IFormElementOptions = new FormElementOptions(obj);
      arr.push(new FormControlBase(eleOptions))
    }
    this.element.subComponents = arr;

  }

  public addOption() {
    const obj = {
      key: 'option' + (this.element.choices.length + 1),
      value: 'Option ' + (this.element.choices.length + 1),
      layout: 'row'
    };
    this.element.choices = this.element.choices.concat([obj]);
  }

  public addTableColumn() {
    const obj: IMap = {
      key: 'column' + (this.element.tableColumnOptions.length + 1),
      value: 'Column' + (this.element.tableColumnOptions.length + 1)
    };

    this.element.tableColumnOptions = this.element.tableColumnOptions.concat([obj]);
  }
  public addTableRow() {
    const obj: IMap = {
      key: 'row' + (this.element.tableRowData.length + 1),
      value: 'Row' + (this.element.tableRowData.length + 1)
    };

    this.element.tableRowData = this.element.tableRowData.concat([obj]);
  }

}
