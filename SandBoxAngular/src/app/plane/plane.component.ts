import { Component } from '@angular/core';
import { PlaneService } from '../plane.service';


@Component({
  selector: 'app-plane',
  template: `
    <ul>
      <li *ngFor="let plane of planes">{{plane}}</li>
    </ul>
  `,
  styles: []
})
export class PlaneComponent {
  planes: string[];

  constructor(private planeService: PlaneService) {
    this.planes = this.planeService.planes;
  }
}
