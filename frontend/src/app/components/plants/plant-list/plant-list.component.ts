import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'aquana-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
})
export class PlantListComponent implements OnInit {
  plants$: Observable<Plant[]>;
  constructor(private plantService: PlantService) {
    this.plants$ = this.plantService.getPlants();
  }

  ngOnInit(): void {}
}
