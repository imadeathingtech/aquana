import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, TimeoutError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Alert, AlertType } from 'src/app/models/alert.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'aquana-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnDestroy {
  alerts: Alert[] = [];
  alertType = AlertType;
  alertsSubscription: Subscription;

  constructor(private alertService: AlertService) {
    this.alertsSubscription = this.alertService
      .getAlerts()
      .subscribe((alert) => {
        this.alerts.push(alert);
        if (alert.autoRemove) {
          this.autoRemove(alert.id);
        }
      });
  }

  removeAlert(id: string) {
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
  }

  autoRemove(id: string) {
    setTimeout(() => this.removeAlert(id), 3500);
  }

  ngOnDestroy(): void {
    this.alertsSubscription.unsubscribe();
  }
}
