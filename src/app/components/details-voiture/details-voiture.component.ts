import { Component, OnInit } from '@angular/core';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-voiture',
  templateUrl: './details-voiture.component.html',
  styleUrls: ['./details-voiture.component.scss']
})
export class DetailsVoitureComponent implements OnInit {

  constructor(private _voitureService: ServiceVoitureService, private router: Router) { }
  selectedControl: number = 1;
  ngOnInit(): void {

    let carId = this.router.url.split('?')[1].split('=')[1];
    console.log(carId)
    this._voitureService.getCarDetailsById(carId).subscribe((res) => {
      console.log(res);
    }, (err)=>{console.error(err)})

  }

  updateSelectedControl(value: number){
    this.selectedControl = value;
  }
}
