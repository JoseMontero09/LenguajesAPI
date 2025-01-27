import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  planes = ['Boeing 737', 'Airbus A320', 'Embraer E190'];
  constructor() { }
}