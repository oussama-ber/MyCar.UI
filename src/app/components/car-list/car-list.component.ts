import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CarModel, FilterCarModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
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
    this.getAllCars();
  }
  initializeFiler(){
    this.carFilter = new FilterCarModel();
  }
  //#region api calls
  getAllCars(){// should add the filter here
    this._voitureService.getCars().subscribe((response)=>{
      this.filteredCars = response.allCars;
      this.filteredCarsIsLoaded = true;
    })
  }
  //#endregion api calls
  dropdown(){}
  openSidebar(){}
}
