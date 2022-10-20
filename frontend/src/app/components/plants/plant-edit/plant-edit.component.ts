import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/models/alert.model';
import { Plant } from 'src/app/models/plant.model';
import { AlertService } from 'src/app/services/alert.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'aquana-plant-edit',
  templateUrl: './plant-edit.component.html',
  styleUrls: ['./plant-edit.component.scss'],
})
export class PlantEditComponent implements OnDestroy {
  plant?: Plant;
  editForm!: FormGroup;
  plantSubscription?: Subscription;

  wateringOptions: any = [1, 2, 7, 14, 30];
  otherWateringOption: boolean = false;

  fertilizerOptions: number[] = [7, 14, 30, 60, 90];
  otherFertilizingOption: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private plantService: PlantService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.initForm();
    this.populateForm();
  }

  initForm() {
    this.editForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(55),
      ]),
      description: new FormControl('', [Validators.maxLength(255)]),
      days_between_watering: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      days_between_watering_custom: new FormControl('', [Validators.min(0)]),
      days_between_fertilizing: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      days_between_fertilizing_custom: new FormControl('', [Validators.min(0)]),
    });
  }

  populateForm() {
    const plantId = this.activatedRoute.snapshot.params.id;
    this.plantSubscription = this.plantService
      .getPlant(plantId)
      .subscribe((plant) => {
        this.plant = plant;
        this.name?.setValue(plant.name);
        this.description?.setValue(plant.description);
        this.setWateringOptions(plant);
        this.setFertilizerOptions(plant);
      });
  }

  setWateringOptions(plant: Plant) {
    if (this.wateringOptions.includes(plant.days_between_watering)) {
      this.days_between_watering?.setValue(plant.days_between_watering);
    } else {
      this.days_between_watering?.setValue('Custom interval');
      this.days_between_watering?.setValue;
      this.days_between_watering_custom?.setValue(plant.days_between_watering);
      this.otherWateringOption = true;
    }
  }

  setFertilizerOptions(plant: Plant) {
    if (this.fertilizerOptions.includes(plant.days_between_fertilizing)) {
      this.days_between_fertilizing?.setValue(plant.days_between_fertilizing);
    } else {
      this.days_between_fertilizing?.setValue('Custom interval');
      this.days_between_fertilizing_custom?.setValue(
        plant.days_between_fertilizing
      );
      this.otherFertilizingOption = true;
    }
  }

  updatePlant() {
    if (this.editForm.valid) {
      if (this.days_between_watering_custom?.value) {
        this.days_between_watering?.setValue(
          this.days_between_watering_custom?.value
        );
      }

      if (this.days_between_fertilizing_custom?.value) {
        this.days_between_fertilizing?.setValue(
          this.days_between_fertilizing_custom?.value
        );
      }

      const merged: Plant = { ...this.plant, ...this.editForm.value };
      this.plantService.updatePlant(merged).subscribe(
        (result) => {
          this.initForm();
          this.populateForm();
          this.alertService.addAlert(
            'Plant was successfully updated',
            AlertType.SUCCESS,
            true
          );
        },
        (error) => {
          this.alertService.addAlert(
            'Plant could not be updated',
            AlertType.ERROR,
            false
          );
        }
      );
    }
  }

  selectDaysBetweenFertilizing() {
    if (
      this.editForm.controls['days_between_fertilizing'].value ===
      'Custom interval'
    ) {
      this.otherFertilizingOption = true;
    } else {
      this.otherFertilizingOption = false;
      this.editForm.controls['days_between_fertilizing_custom'].setValue('');
    }
  }

  selectDaysBetweenWatering() {
    if (
      this.editForm.controls['days_between_watering'].value ===
      'Custom interval'
    ) {
      this.otherWateringOption = true;
    } else {
      this.otherWateringOption = false;
      this.editForm.controls['days_between_watering_custom'].setValue('');
    }
  }

  confirmDeletion() {
    const result = confirm('Are you sure you want to delete this plant?');
    if (result) {
      this.plantService.removePlant(this.plant!.id).subscribe(
        (result) => {
          this.alertService.addAlert(
            'Plant was removed',
            AlertType.SUCCESS,
            true
          );
          this.router.navigate(['/']);
        },
        (error) => {
          this.alertService.addAlert(
            'Plant could not be removed',
            AlertType.ERROR,
            false
          );
        }
      );
    }
  }

  ngOnDestroy() {
    this.plantSubscription?.unsubscribe();
  }

  get name() {
    return this.editForm.get('name');
  }
  get description() {
    return this.editForm.get('description');
  }

  get days_between_watering() {
    return this.editForm.get('days_between_watering');
  }

  get days_between_watering_custom() {
    return this.editForm.get('days_between_watering_custom');
  }

  get days_between_fertilizing() {
    return this.editForm.get('days_between_fertilizing');
  }

  get days_between_fertilizing_custom() {
    return this.editForm.get('days_between_fertilizing_custom');
  }
}
