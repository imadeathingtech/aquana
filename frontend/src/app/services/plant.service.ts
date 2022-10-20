import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>('http://localhost:3000/api/plants');
  }

  getPlant(id: string): Observable<Plant> {
    return this.http.get<Plant>(`http://localhost:3000/api/plants/${id}`);
  }

  updatePlant(plant: Plant): Observable<any> {
    return this.http.patch(
      `http://localhost:3000/api/plants/${plant.id}`,
      plant
    );
  }

  createPlant(plant: Plant): Observable<any> {
    return this.http.post('http://localhost:3000/api/plants/create', plant);
  }

  saveImage(image: string) {
    return this.http.post('http://localhost:3000/api/plants/save-image', {
      image: image,
    });
  }

  removePlant(id: string) {
    return this.http.delete(`http://localhost:3000/api/plants/${id}`);
  }
}
