import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Plant } from './models/plant.model';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Aquana';

  readonly VAPID_PUBLIC_KEY =
    'BBFBMBc5GPKjW55rqabZLsfW4YYXBUCCdkt-1BbdH_2NKo7lBvTSIsUdpu_NIhoSly69jZDR1DI1xMOEL6xy2Ww';

  constructor(
    private swPush: SwPush,
    private notificationService: NotificationService
  ) {}

  sendNotification() {
    const plant: Plant = {
      id: '1',
      name: 'Succulent',
      description:
        "Grows fast and needs lot's of light. Make sure the soil is not constantly wet.",
      image: 'http://localhost:3000/public/succulent.jpg',
      last_watered: '2022-08-21 21:23:00',
      last_fertilized: '2022-08-21 21:23:00',
      days_between_watering: 1,
      days_between_fertilizing: 30,
    };

    this.notificationService.sendNotification(plant).subscribe((res) => {
      console.log(res);
    });
  }

  notify() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) =>
        this.notificationService.addNotificationSubscriber(sub).subscribe(
          () => {
            console.log('Sent push subscription object to server.');
          },
          (err) =>
            console.log(
              'Could not send subscription object to server, reason: ',
              err
            )
        )
      )
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }
}
