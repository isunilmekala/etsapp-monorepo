import { FormControlBase } from "../form_controls/form-control.base";

export interface IForm {
  form_name: string;
  form_id: number;
  form_url: string;
  description: string;
  data?: any;
}

export interface IWidget {
    stat_title: string;
    stat_icon: string;
    stat_number: string;
    stat_cls: string;
    stat_text: string;
    stat_percent: number;
    info_title: string;
    info_text: string;
    today_val: string;
    today_percent: string;
    lastweek_val: string;
    lastweek_percent: string;
}

export interface IFormElement {
  key: string;
  type: string;
  label: string;
  triggerOn?: string;
  layout?: string;
  subComponents?: FormControlBase<any>[];
  remote_columns_url?: string;
  remote_rows_url?: string;
  remote_data_url?: string;
  widgets?: IWidget[];
  validations?: IValidations;
  debounceTime?: number;
  resultLimit?: number;
}

export interface IFormElementOptions {
  value?: any;
  key?: string;
  label?: string;
  triggerOn: 'change' | 'blur' | 'submit';
  subComponents?: FormControlBase<any>[];
  hidden?: boolean;
  order?: number;
  type?: string;
  rows?: number;
  columns?: number;
  layout?: string;
  min?: any;
  max?: any;
  tableRows?: number;
  tableCols?: number;
  labelOrientation?: string;
  label_align?: string;
  required_divider?: boolean;
  place_holder?: string;
  remote_choices_url?: string;
  remote_data_url?: string;
  disable?: boolean;
  validations?: IValidations;
  options?: Array<IOption>;
  taboptions?: ITab[];
  tableColumnOptions?: Array<IMap>;
  tableColumnsRemoteUrl?: string;
  tableRowData?: Array<IMap>;
  tableDataRemoteUrl?: string;
  signatureWidth?: number;
  signatureHeight?: number;
  tabsCount?: number;
  toJson(): string;
  widgets?: IWidget[];
  zoom?: number;
  origin?: string;
  destination?: string;
  debounceTime?: number;
  resultLimit?: number;
}

export interface IValidations {
  required: boolean;
  min_length: number;
  max_length: number;
  pattern: string;
  serverValidateUrl?: string;
}

export interface IMap {
  // key: string;
  // value: string;
  [key: string]: string;

}

export interface IOption {
  key: string;
  value: string;
  layout?: string;
}

export interface ITab {
  key: string;
  label: string;
  type: string;
  subComponents?: any[];
}

export interface Tag {
  name: string;
  color: string;
  backgroundColor: string;
}