import { FormControlBase } from '../form_controls/form-control.base';
import { IFormElement, IFormElementOptions, IMap, IOption, ITab, IValidations, IWidget } from '../models/core.model';

export class FormElementOptions implements IFormElementOptions {
  value: any = '';
  key: string;
  label: string;
  triggerOn: 'change' | 'blur' | 'submit' = 'change';
  subComponents: FormControlBase<any>[] | undefined;
  hidden = false;
  type: string;
  rows: any = 2;
  columns: any = 50;
  min: number | undefined;
  max = 1000;
  tableRows = 1;
  tableCols = 1;
  layout = 'col_33';
  labelOrientation = 'up';
  label_align = 'left';
  required_divider = false;
  place_holder = '';
  remote_choices_url = '';
  remote_data_url = '';
  disable = false;
  tableColumnsRemoteUrl: string | undefined;
  tableDataRemoteUrl: string | undefined;
  tabsCount = 3;
  widgets: IWidget[] = [];
  zoom = 13;
  origin = '';
  destination = '';
  debounceTime: number | undefined;
  resultLimit: number | undefined;
  order?: number | undefined;
  signatureWidth?: number | undefined;
  signatureHeight?: number | undefined;

  public validations: IValidations = {
    required: false,
    max_length: 0,
    min_length: 0,
    pattern: '',
  };
  public options: Array<IOption> = [
    {
      key: 'option1',
      value: 'Option 1',
      layout: 'row',
    },
  ];
  public taboptions: ITab[] = [];

  public tableColumnOptions: Array<IMap> = [
    {
      key: 'column1',
      value: 'Column 1',
    },
    {
      key: 'column2',
      value: 'Column 2',
    },
    {
      key: 'column3',
      value: 'Column 3',
    },
    {
      key: 'column4',
      value: 'Column 4',
    },
  ];

  public tableRowData: Array<IMap> = [
    {
      key: 'row1',
      value: 'Row 1',
    },
    {
      key: 'row2',
      value: 'Row 2',
    },
    {
      key: 'row3',
      value: 'Row 3',
    },
    {
      key: 'row4',
      value: 'Row 4',
    },
  ];

  // constructor(key: string, label: string, type: string, components?: FormControlBase<any>[]) {
  //     this.type = type;
  //     this.key = key;
  //     this.label = label;
  //     this.subComponents = components;

  // }

  constructor(initialObj: IFormElement) {
    this.type = initialObj.type;
    this.key = initialObj.key;
    this.label = initialObj.label;
    this.layout = initialObj.layout || this.layout;

    if (initialObj.triggerOn && !['change', 'blur', 'submit'].includes(initialObj.triggerOn)) {
      this.triggerOn = 'change';
    }

    if (initialObj.subComponents) {
      this.subComponents = initialObj.subComponents;
    }
    if (initialObj.remote_columns_url) {
      this.tableColumnsRemoteUrl = initialObj.remote_columns_url || '';
      this.tableColumnOptions = [];
      this.tableCols = 0;
    }
    if (initialObj.remote_rows_url) {
      this.tableDataRemoteUrl = initialObj.remote_rows_url || '';
      this.tableRowData = [];
      this.tableRows = 0;
    }

    for (let i = 0; i < this.tabsCount; i++) {
      this.taboptions.push({
        key: 'Tab' + (i + 1),
        label: 'Tab ' + (i + 1),
        type: 'tab',
        subComponents: [],
      });
    }

    if (initialObj.widgets) {
      this.widgets = initialObj.widgets;
    }
    if (initialObj.remote_data_url) {
      this.remote_data_url = initialObj.remote_data_url;
      this.remote_choices_url = initialObj.remote_data_url;
    }
    if (initialObj.validations) {
      this.validations = initialObj.validations;
    }
  }

  public toJson(): string {
    const obj = {
      value: this.value,
      key: this.key,
      label: this.label,
      triggerOn: this.triggerOn,
      subComponents: this.subComponents,
      hidden: this.hidden,
      type: this.type,
      rows: this.rows,
      columns: this.columns,
      min: this.min,
      max: this.max,
      tableRows: this.tableRows,
      tableCols: this.tableCols,
      layout: this.layout,
      labelOrientation: this.labelOrientation,
      label_align: this.label_align,
      required_divider: this.required_divider,
      place_holder: this.place_holder,
      remote_data_url: this.remote_data_url,
      remote_choices_url: this.remote_choices_url,
      disable: this.disable,
      tabsCount: this.tabsCount,
      zoom: this.zoom,
      origin: this.origin,
      destination: this.destination,
      validations: {
        required: this.validations.required,
        max_length: this.validations.max_length,
        min_length: this.validations.min_length,
        pattern: this.validations.pattern,
      },
      options: this.options,
      // taboptions: this.taboptions,
      tableRowData: this.tableRowData,
      tableColumnOptions: this.tableColumnOptions,
      tableColumnsRemoteUrl: this.tableColumnsRemoteUrl,
      tableDataRemoteUrl: this.tableDataRemoteUrl,
      widgets: this.widgets,
      debounceTime: this.debounceTime,
      resultLimit: this.resultLimit
    };
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
}
