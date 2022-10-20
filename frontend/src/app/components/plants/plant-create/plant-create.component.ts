import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'aquana-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.scss'],
})
export class PlantCreateComponent {
  createForm!: FormGroup;

  wateringOptions: any = [1, 2, 7, 14, 30];
  otherWateringOption: boolean = false;

  fertilizerOptions: number[] = [7, 14, 30, 60, 90];
  otherFertilizingOption: boolean = false;

  image: string = '';

  constructor(
    private plantService: PlantService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.image = this.activatedRoute.snapshot.queryParams.file;
    this.initForm();
  }
  initForm() {
    this.createForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(55),
      ]),
      description: new FormControl('', [Validators.maxLength(255)]),
      days_between_watering: new FormControl('Please select', [
        Validators.required,
        Validators.min(0),
      ]),
      days_between_watering_custom: new FormControl('', [Validators.min(0)]),
      days_between_fertilizing: new FormControl('Please select', [
        Validators.required,
        Validators.min(0),
      ]),
      days_between_fertilizing_custom: new FormControl('', [Validators.min(0)]),
    });
  }

  createPlant() {
    if (this.createForm.valid) {
      const now = new Date();

      const newPlant: Plant = {
        ...this.createForm.value,
        image: this.image,
        last_watered: now.toISOString().split('T')[0],
        last_fertilized: now.toISOString().split('T')[0],
      };
      this.plantService.createPlant(newPlant).subscribe((result) => {
        this.router.navigate(['/']);
      });
    }
  }

  get name() {
    return this.createForm.get('name');
  }
  get description() {
    return this.createForm.get('description');
  }

  get days_between_watering() {
    return this.createForm.get('days_between_watering');
  }

  get days_between_watering_custom() {
    return this.createForm.get('days_between_watering_custom');
  }

  get days_between_fertilizing() {
    return this.createForm.get('days_between_fertilizing');
  }

  get days_between_fertilizing_custom() {
    return this.createForm.get('days_between_fertilizing_custom');
  }
}
