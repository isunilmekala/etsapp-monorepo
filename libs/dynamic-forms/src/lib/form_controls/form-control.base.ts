import { IFormElementOptions, IMap, IOption, ITab, IValidations, IWidget } from '../models/core.model';
import { FormElementOptions } from './form-element-options';

export class FormControlBase<T> {
  value: T;
  key: string;
  label: string;
  triggerOn: 'change' | 'blur' | 'submit' | undefined;
  hidden: boolean;
  type: string;
  remoteSelectOptions: Array<IOption> = [];
  placeHolder: string;
  remote_data_url: string;
  remote_choices_url: string;
  layout: string;
  labelAlign: string;
  labelOrientation: string;
  requiredDivider: boolean;
  choices: Array<IOption> = [];
  validations: IValidations;
  optionAsJson: string | undefined;
  rows: number | undefined;
  columns: number | undefined;
  min: number | undefined;
  max: number | undefined;
  disable: boolean;
  tableRows: number | undefined;
  tableCols: number | undefined;
  // taboptions: any[];
  tableColumnOptions: Array<IMap> =[];
  tableColumnsRemoteUrl: string | undefined;
  tableRowData: Array<IMap>  = [];
  tableDataRemoteUrl: string | undefined;
  subComponents: FormControlBase<T>[] = [];
  signatureWidth: number | undefined;
  signatureHeight: number | undefined;
  tabsCount: number;
  widgets: IWidget[] = [];
  zoom: number | undefined;
  origin: string | undefined;
  destination: string | undefined;
  debounceTime: number;
  resultLimit: number;

  constructor(public options: IFormElementOptions = {} as IFormElementOptions) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.layout = options.layout || 'column';
    this.hidden = !!options.hidden;
    this.type = options.type || '';
    this.placeHolder = options.place_holder || '';
    this.labelOrientation = options.labelOrientation || 'up';
    this.labelAlign = options.label_align || 'left';
    this.requiredDivider = !!options.required_divider;
    this.remote_data_url = options.remote_data_url || '';
    this.remote_choices_url = options.remote_choices_url || '';
    this.validations = options.validations || ({} as IValidations);
    this.tabsCount = options.tabsCount || 2;
    this.debounceTime = options.debounceTime || 500;
    this.resultLimit = options.resultLimit || 10;

    if (options.type === 'textarea') {
      this.rows = options.rows || 2;
      this.columns = options.columns || 50;
    }

    if (options.type === 'number' || options.type === 'date') {
      this.min = options.min;
      this.max = options.max;
    }

    if (options.type === 'table') {
      this.tableCols = options.tableCols;
      this.tableColumnOptions = options.tableColumnOptions || [];
      this.tableColumnsRemoteUrl = options.tableColumnsRemoteUrl;

      this.tableRows = options.tableRows;
      this.tableRowData = options.tableRowData || [];
      this.tableDataRemoteUrl = options.tableDataRemoteUrl;
    }

    this.subComponents = this.coverttoFormControlBase(options.subComponents);

    if (options.type === 'tabs') {
      // this.tabsCount = options.tabsCount || 3;
      // this.subComponents = this.prepareSubComponents(options.taboptions);
      this.subComponents = this.prepareSubComponents(options.subComponents ? options.subComponents : options.taboptions);
    }

    this.disable = options.disable || false;

    if (options.type === 'signature') {
      this.signatureHeight = options.signatureHeight || 100;
      this.signatureWidth = options.signatureWidth || 250;
    }

    if (options.type === 'directions') {
      this.zoom = options.zoom || 13;
      this.origin = options.origin || '';
      this.destination = options.destination || '';
      this.layout = 'row';
    }

    // this.choices = (options.options) ? ((this.remote_choices_url === '') ? options.options : []) : [];
    if (options.type === 'checkbox' || options.type === 'radio' || options.type === 'dropdown') {
      this.choices = options.options ? (this.remote_choices_url === '' ? options.options : []) : [];
      let i: number;
      const len = this.choices.length;

      for (i = 0; i < len; i++) {
        if (!this.choices[i].layout) {
          this.choices[i].layout = 'column';
        }
      }
    }

    if ((options.type === 'dashboard')) {
      this.widgets = options.widgets || [];
    }

    if (!['change', 'blur', 'submit'].includes(options.triggerOn)) {
      this.triggerOn = 'change';
    }
  }

  public getControlType() {
    let type = 'control';
    switch (this.type) {
      case 'panel':
      case 'tabs':
      case 'tab':
      case 'login-component':
      case 'credit-card':
      case 'dashboard':
        type = 'layout';
        break;
    }
    return type;
  }
  private coverttoFormControlBase(subComponents: FormControlBase<any>[] = []) {
    const tempArray: FormControlBase<any>[] = [];
    if (subComponents) {
      subComponents.forEach((val: any) => {
        tempArray.push(new FormControlBase(val));
      });
    }

    return tempArray;
  }

  public toJson(): string {
    const obj = this.prepareObject();
    return JSON.stringify(obj, null, 2)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls;
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'key' : 'string';
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        } else {
          cls = 'number';
        }
        return '<span class="json-' + cls + '">' + match + '</span>';
      })
      .replace(/ /g, '&nbsp;&nbsp;')
      .replace(/{/g, '&nbsp;{')
      .replace(/}/g, '&nbsp;}')
      .replace(/\n/g, '<br/>');
  }

  public prepareObject() {
    const obj = {
      value: this.value,
      key: this.key,
      label: this.label,
      hidden: this.hidden,
      triggerOn:this.triggerOn,
      type: this.type,
      rows: this.rows,
      columns: this.columns,
      min: this.min,
      max: this.max,
      tableRows: this.tableRows,
      tableCols: this.tableCols,
      layout: this.layout,
      label_orientation: this.labelOrientation,
      label_align: this.labelAlign,
      required_divider: this.requiredDivider,
      place_holder: this.placeHolder,
      remoteSelectOptions: this.remoteSelectOptions,
      remote_data_url: this.remote_data_url,
      remote_choices_url: this.remote_choices_url,
      disable: this.disable,
      validations: {
        required: this.validations.required,
        max_length: this.validations.max_length,
        min_length: this.validations.min_length,
        pattern: this.validations.pattern,
      },
      zoom: this.zoom,
      origin: this.origin,
      destination: this.destination,
      options: this.choices,
      // taboptions: this.taboptions,
      tableColumnOptions: this.tableColumnOptions,
      tableRowData: this.tableRowData,
      tableColumnsRemoteUrl: this.tableColumnsRemoteUrl,
      tableDataRemoteUrl: this.tableDataRemoteUrl,
      subComponents: this.prepareSubs(),
      signatureHeight: this.signatureHeight,
      signatureWidth: this.signatureWidth,
      widgets: this.widgets,
      debounceTime: this.debounceTime,
      resultLimit: this.resultLimit
    };
    return obj;
  }

  private prepareSubs(): any[] {
    const elements: any[] = [];
    this.subComponents.forEach((control) => {
      elements.push(control.prepareObject());
    });

    return elements;
  }

  private prepareSubComponents(options: ITab[] = []): FormControlBase<any>[] {
    const arr: FormControlBase<any>[] = [];
    options.forEach((element) => {
      const obj = {
        key: element.key,
        type: element.type,
        label: element.label,
        subComponents: element.subComponents,
      };
      const eleOptions: IFormElementOptions = new FormElementOptions(obj);
      arr.push(new FormControlBase(eleOptions));
    });
    console.log(arr);
    return arr;
  }

  setRemoteSelectOptions(data: Array<IOption>): void {
    this.remoteSelectOptions = [...data];
  }

  setRemoteChoices(data: Array<IOption>): void {
    this.choices = [...data];
  }

  setRemoteTableRowData(data: Array<IMap>): void {
    this.tableRowData = [...data];
  }

  setRemoteTableColumnOptions(data: Array<IMap>): void {
    this.tableColumnOptions = [...data];
  }
}
