import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  //#region variables
  public latestCars: CarModel[] = []
  public latestCarsIsLoaded: boolean= false;
  //#endregion variables

  constructor(private _voitureService: ServiceVoitureService, private router: Router) { }

  ngOnInit(): void {
    this.getLatestCars();
  }
  //#region api calls
  getLatestCars(){
    this._voitureService.getLastestCars().subscribe(
      (response)=>{
        this.latestCars = response.lastestCars;
        console.log("latestCars", this.latestCars[0].marque);
        this.latestCarsIsLoaded = true;
      },
      (error)=>{
        console.log("error", error)
      }
    )
  }
  //#endregion api calls
  goToAllCars(){
    this.router.navigate(["/carlist"])
  }
}
