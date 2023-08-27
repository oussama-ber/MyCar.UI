import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CarModel, FilterCarModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';

@Component({
  selector: 'app-acheter-voiture',
  templateUrl: './acheter-voiture.component.html',
  styleUrls: ['./acheter-voiture.component.scss']
})
export class AcheterVoitureComponent implements OnInit {

  carFilter: FilterCarModel = new FilterCarModel();
  filteredCars: CarModel[] = [];
  filteredCarsIsLoaded: boolean = false;
  public searchTextSubject = new Subject<any>();
  public subjectToDestroy = new Subject<any>();
  constructor(private _voitureService: ServiceVoitureService, private router: Router) {
     this.searchTextSubject
      .pipe(debounceTime(1500), takeUntil(this.subjectToDestroy))
      .subscribe(() => {
        //get the filtered data
      });
  }

  ngOnInit(): void {
      this.initializeFiler();
      this.getFilteredCars();
  }
  initializeFiler(){
    this.carFilter = new FilterCarModel();
  }
  //#region api calls
  getFilteredCars(){// should add the filter here
    // this.carFilter.marque = ["marque ","6"];
    // this.carFilter.prixMax = 1002;
    // this.carFilter.prixMin = 1000
    // this.carFilter.kilometrageMin = 1
    // this.carFilter.kilometrageMax = 6
    // this.carFilter.dateMin = 2020
    // this.carFilter.dateMax = 2023
    // this.carFilter.boiteVitesse =["boiteVitesse","2"];
    // this.carFilter.carburant =["carburant","2"];
    // this.carFilter.modele = ["modele", "6"];
    this._voitureService.getFilteredCars(this.carFilter).subscribe(
      (response)=>{
      this.filteredCars = response.allCars;
      this.filteredCarsIsLoaded = true;
    },
    (error)=>{
      console.error("error", error)
    })
  }
  //#endregion api calls
}
