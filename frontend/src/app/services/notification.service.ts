import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  addNotificationSubscriber(sub: any) {
    return this.http.post(
      'http://localhost:3000/api/notifications/subscribe',
      sub
    );
  }

  sendNotification(plant: Plant) {
    return this.http.post(
      'http://localhost:3000/api/notifications/send',
      plant
    );
  }
}
