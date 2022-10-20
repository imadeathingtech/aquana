export interface Alert {
  id: string;
  message: string;
  type: AlertType;
  autoRemove: boolean;
}

export enum AlertType {
  SUCCESS,
  ERROR,
  INFO,
}
