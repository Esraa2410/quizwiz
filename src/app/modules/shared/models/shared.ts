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
  label?: string;
  btnIcon: string;
  class: string;
  action: (row: any) => void;
}

export interface IDialogForm {
  controlName: string;
  label: string;
  placholder: string;
  class: string;
  elementType: string;
}

