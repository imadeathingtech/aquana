import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'aquana-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
})
export class PlantDetailsComponent {
  plant$?: Observable<Plant>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private plantService: PlantService
  ) {
    this.loadPlant();
  }

  loadPlant() {
    const plantId = this.activatedRoute.snapshot.params.id;
    this.plant$ = this.plantService.getPlant(plantId);
  }

  waterPlant(plant: Plant) {
    const now = new Date();
    plant.last_watered = now.toISOString().split('T')[0];
    plant.last_fertilized = plant.last_fertilized.split('T')[0];
    this.plantService.updatePlant(plant).subscribe((result) => {
      this.loadPlant();
    });
  }

  fertilizePlant(plant: Plant) {
    const now = new Date();
    plant.last_fertilized = now.toISOString().split('T')[0];
    plant.last_watered = plant.last_watered.split('T')[0];
    this.plantService.updatePlant(plant).subscribe((result) => {
      this.loadPlant();
    });
  }
}
