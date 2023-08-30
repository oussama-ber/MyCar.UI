import { Component, OnInit } from '@angular/core';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';

@Component({
  selector: 'app-details-voiture',
  templateUrl: './details-voiture.component.html',
  styleUrls: ['./details-voiture.component.scss']
})
export class DetailsVoitureComponent implements OnInit {

  constructor(private _voitureService: ServiceVoitureService) { }
  selectedControl: number = 1;
  ngOnInit(): void {
    this._voitureService.getCarDetailsById('64ea912f50e50b39fb676781').subscribe((res) => {
      console.log(res);
    }, (err)=>{console.error(err)})

  }

  updateSelectedControl(value: number){
    this.selectedControl = value;
  }
}
