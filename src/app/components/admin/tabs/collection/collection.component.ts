import { Component, OnInit } from '@angular/core';
import { CarModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  carsList : CarModel[] = []
  carsListIsLoaded : boolean = false;
  constructor(private _voitureService: ServiceVoitureService) { }

  ngOnInit(): void {
    this.getAllCars();
  }
  getAllCars(){
    this._voitureService.getCars().subscribe((response)=>{
      this.carsList = response.allCars;
      this.carsListIsLoaded = true ;
    });
  }
  deleteCarById(carId: number){
     this._voitureService.deleteCarById(carId).subscribe((response)=>{
      this.getAllCars();
     })
  }
}
