import { inject, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { PlantListComponent } from './components/plants/plant-list/plant-list.component';
import { PlantEditComponent } from './components/plants/plant-edit/plant-edit.component';
import { PlantCreateComponent } from './components/plants/plant-create/plant-create.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlantListItemComponent } from './components/plants/plant-list-item/plant-list-item.component';
import { PlantStatusBarComponent } from './components/plants/plant-status-bar/plant-status-bar.component';
import { PlantDetailsComponent } from './components/plants/plant-details/plant-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlantCaptureImageComponent } from './components/plants/plant-capture-image/plant-capture-image.component';
import { AlertsComponent } from './components/shared/alerts/alerts.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpErrorInterceptor } from './interceptors/httpError.interceptor';
import { AlertService } from './services/alert.service';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    PlantListComponent,
    PlantEditComponent,
    PlantCreateComponent,
    PlantListItemComponent,
    PlantStatusBarComponent,
    PlantDetailsComponent,
    PlantCaptureImageComponent,
    AlertsComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: environment.AUTH_DOMAIN,
      clientId: environment.AUTH_CLIENT_ID,
      audience: environment.AUTH_AUDIENCE,
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.AUTH_AUDIENCE}/*`,
            tokenOptions: {
              audience: environment.AUTH_AUDIENCE,
              scope: 'update:current_user_metadata',
            },
          },
        ],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [AlertService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
