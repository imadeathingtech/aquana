import { Component, Input, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';

@Component({
  selector: 'aquana-plant-status-bar',
  templateUrl: './plant-status-bar.component.html',
  styleUrls: ['./plant-status-bar.component.scss'],
})
export class PlantStatusBarComponent implements OnInit {
  @Input() metricLastUpdated!: string;
  @Input() metricInterval!: number;
  currentStatus?: number;

  constructor() {}

  ngOnInit(): void {
    this.calculateMetricStatus();
  }

  calculateMetricStatus() {
    const today = new Date();
    const lastUpdated = new Date(this.metricLastUpdated);
    const difference = today.getTime() - lastUpdated.getTime();
    const differenceInDays = Math.floor(difference / (1000 * 3600 * 24));
    this.currentStatus = this.metricInterval - differenceInDays + 1;
  }
}
