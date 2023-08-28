import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CarModel, FilterCarModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  carFilter: FilterCarModel = new FilterCarModel();
  filteredCars: CarModel[] = [];
  filteredCarsIsLoaded: boolean = false;
  public prixMinSubject = new Subject<any>();
  public prixMaxSubject = new Subject<any>();
  public kilometrageMinSubject = new Subject<any>();
  public kilometrageMaxSubject = new Subject<any>();
  public marqueSubject = new Subject<any>();
  public boiteVitessSubject = new Subject<any>();
  public carburantSubject = new Subject<any>();
  public searchTextSubject = new Subject<any>();
  public subjectToDestroy = new Subject<any>();
  filterForm!: FormGroup;
  public selectPrixMin! : number
  public mimumPrix: number = 0;
  public selectPrixMax! : number
  public maximumPrix: number = 0;
  public selectKilometrageMin! : number
  public mimumKilometrage: number = 0;
  public selectKilometrageMax! : number
  public maximumKilometrage: number = 0;
  public allMarques: string [] = []
  public allCarburants: string [] = []
  public allBoitesVitesses: string [] = []
  public selectedMarques: string [] = []
  public selectedBoiteVitesses: string [] = []
  public selectedCarburants: string [] = []
  constructor(private _fb : UntypedFormBuilder ,private _voitureService: ServiceVoitureService, private router: Router, private sharedService: SharedService) {
    this.marqueSubject.pipe(debounceTime(0), takeUntil(this.subjectToDestroy)).subscribe(async (selectedMarque) => {
      // this.carFilter.prixMin = this.selectPrixMin;
      this.addDeletedMarque(selectedMarque);
      this.carFilter.marque = this.selectedMarques;
      await this.getFilteredCars();
    });
    this.carburantSubject.pipe(debounceTime(0), takeUntil(this.subjectToDestroy)).subscribe(async (selectedCarburant) => {
      // this.carFilter.prixMin = this.selectPrixMin;
      this.addDeletedCarburant(selectedCarburant);
      this.carFilter.carburant = this.selectedCarburants;
      await this.getFilteredCars();
    });
    this.boiteVitessSubject.pipe(debounceTime(0), takeUntil(this.subjectToDestroy)).subscribe(async (selectedBoiteVitesse) => {
      // this.carFilter.prixMin = this.selectPrixMin;
      this.addDeletedBoiteVitesse(selectedBoiteVitesse);
      this.carFilter.boiteVitesse = this.selectedBoiteVitesses;
      await this.getFilteredCars();
    });
    this.prixMinSubject.pipe(debounceTime(0), takeUntil(this.subjectToDestroy)).subscribe(async () => {
      this.carFilter.prixMin = this.selectPrixMin;
      await this.getFilteredCars();
    });
    this.prixMaxSubject.pipe(debounceTime(0), takeUntil(this.subjectToDestroy)).subscribe(async () => {
      this.carFilter.prixMax = this.selectPrixMax;
      await this.getFilteredCars();
    });
    this.kilometrageMinSubject.pipe(debounceTime(0), takeUntil(this.subjectToDestroy)).subscribe(async () => {
      this.carFilter.kilometrageMin = this.selectKilometrageMin;
      await this.getFilteredCars();
    });
    this.kilometrageMaxSubject.pipe(debounceTime(0), takeUntil(this.subjectToDestroy)).subscribe(async () => {
      this.carFilter.kilometrageMax = this.selectKilometrageMax;
      await this.getFilteredCars();
    });
    this.searchTextSubject
    .pipe(debounceTime(1500), takeUntil(this.subjectToDestroy))
    .subscribe(() => {
      //get the filtered data
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getFilterDetails();
    await this.initializeFiler();
    await  this.getInputFilter();
    await this.getAllCars();
    await this.getFilteredCars();
  }
  addDeletedCarburant(input :string){
    let carburantExistsIndex = this.selectedCarburants.findIndex(el => el == input);
    if(carburantExistsIndex != -1){
      this.selectedCarburants = this.selectedCarburants.filter(el => el != input);
    }else{
      this.selectedCarburants.push(input);
    }
  }
  addDeletedBoiteVitesse(input :string){
    let btExistsIndex = this.selectedBoiteVitesses.findIndex(el => el == input);
    if(btExistsIndex != -1){
      this.selectedBoiteVitesses = this.selectedBoiteVitesses.filter(el => el != input);
    }else{
      this.selectedBoiteVitesses.push(input);
    }
  }
  addDeletedMarque(input :string){
    let marqueExistsIndex = this.selectedMarques.findIndex(el => el == input);
    if(marqueExistsIndex != -1){
      this.selectedMarques = this.selectedMarques.filter(el => el != input);
    }else{
      this.selectedMarques.push(input);
    }
  }
  async getFilterDetails(){
    this._voitureService.getFilter().subscribe(
      (response)=>{
        this.mimumPrix = response.minPrix
        this.maximumPrix = response.maxPrix;
        this.allMarques = response.distinctMarques;
        this.allCarburants = response.distinctCarburants;
        this.allBoitesVitesses = response.distinctBoiteVitesses;
        this.mimumKilometrage = response.minKilometrage;
        this.maximumKilometrage = response.maxKilometrage;
      },
      (error)=>{
        console.error("error", error)
      });
  }
  async getInputFilter(){
  let inputFiler = await this.sharedService.getfilterVariable();
  console.log("inputFiler", inputFiler)
  this.carFilter = inputFiler;
  }
   initializeFiler(){
     this.carFilter = new FilterCarModel();
  }
  //#region api calls
  async getFilteredCars(){// should add the filter here
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
    await this._voitureService.getFilteredCars(this.carFilter).subscribe(
      (response)=>{
      this.filteredCars = response.allCars;
      console.log("this.filteredCars", this.filteredCars)
      this.filteredCarsIsLoaded = true;
    },

    (error)=>{
      console.log("error", error)
    })
  }
  async getAllCars(){// should add the filter here
    await this._voitureService.getCars().subscribe((response)=>{
      this.filteredCars = response.allCars;
      this.filteredCarsIsLoaded = true;
    })
  }
  //#endregion api calls
  dropdown(){}
  openSidebar(){}
}
