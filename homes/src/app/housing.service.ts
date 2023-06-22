import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { housingLocations } from './housingLocations';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  housingLocationList = housingLocations;

  constructor() { }

  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }
}