import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertSubject = new Subject<Alert>();

  getAlerts(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }

  addAlert(message: string, type: AlertType, autoRemove: boolean) {
    const alert: Alert = {
      id: String(new Date().getTime()),
      autoRemove: autoRemove,
      message: message,
      type: type,
    };
    this.alertSubject.next(alert);
  }

  clearAlerts() {
    this.alertSubject.next(undefined);
  }

  constructor() {}
}
