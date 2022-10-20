import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantCaptureImageComponent } from './components/plants/plant-capture-image/plant-capture-image.component';
import { PlantCreateComponent } from './components/plants/plant-create/plant-create.component';
import { PlantDetailsComponent } from './components/plants/plant-details/plant-details.component';
import { PlantEditComponent } from './components/plants/plant-edit/plant-edit.component';
import { PlantListComponent } from './components/plants/plant-list/plant-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', component: PlantListComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'plants/create',
    component: PlantCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plants/capture-image',
    component: PlantCaptureImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plants/:id',
    component: PlantDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plants/:id/edit',
    component: PlantEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
