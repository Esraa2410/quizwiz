export interface IFormsField {
  controlName: string;
  label: string;
  type: string;
  placeholder: string;
  iconClass: string;
}

export interface IBreadCrumb {
  label: string;
  url?: string;
}

export interface IButtonConfig {
  label: string;
  class: string;
  action: () => void;
}