import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CarModel, CarModelImage, FilterCarModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  //#region variables
  public latestCars: CarModelImage[] = []
  public latestCarsIsLoaded: boolean= false;
  filterForm!: FormGroup;
  carFilter: FilterCarModel = new FilterCarModel();
  //#endregion variables

  constructor( private _fb : UntypedFormBuilder ,private _voitureService: ServiceVoitureService, private router: Router, private shareService: SharedService) { }

  ngOnInit(): void {
    this.filterForm = this._fb.group({
      searchText: [""],
      kilometrageMaximum: [null],
      prixMaximum: [null],
    })
    this.getLatestCars();
  }
  initializeFilter(){
    this.filterForm.controls["searchText"].setValue("");
    this.filterForm.controls["kilometrageMaximum"].setValue(null);
    this.filterForm.controls["prixMaximum"].setValue(null);
  }
  //#region api calls
  getLatestCars(){
    this._voitureService.getLastestCars().subscribe(
      (response)=>{
        this.latestCars = response.allCarsDetails;
        this.latestCarsIsLoaded = true;
      },
      (error)=>{
        console.log("error", error)
      }
    )
  }
  //#endregion api calls
  goToAllCars(){
    this.router.navigate(["/achetervoiture"])
  }
  onSearch(){
    let kmMaxInput = this.filterForm.controls["kilometrageMaximum"].value;
    let prixMaxInput = this.filterForm.controls["prixMaximum"].value;
    this.carFilter.marque.push(this.filterForm.controls["searchText"].value);
    if(kmMaxInput != null){
      this.carFilter.kilometrageMax = this.filterForm.controls["kilometrageMaximum"].value;
    }
    if(prixMaxInput != null){
      this.carFilter.prixMax = this.filterForm.controls["prixMaximum"].value;
    }
    this.shareService.setFiler(this.carFilter);
    // if()
    this.initializeFilter();
    this.router.navigate(['/achetervoiture']);
  }
}
