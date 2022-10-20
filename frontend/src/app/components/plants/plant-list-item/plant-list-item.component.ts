import { Component, Input, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';

@Component({
  selector: 'aquana-plant-list-item',
  templateUrl: './plant-list-item.component.html',
  styleUrls: ['./plant-list-item.component.scss'],
})
export class PlantListItemComponent implements OnInit {
  @Input() plant!: Plant;

  constructor() {}

  ngOnInit(): void {}
}
