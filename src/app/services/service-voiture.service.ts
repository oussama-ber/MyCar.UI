import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilterCarModel, RequestModel } from '../models/CarModel';
@Injectable()
export class ServiceVoitureService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl: string = "http://localhost:5000/api";
  // baseUrl: string = "https://myauto-service-api.onrender.com/api/car";

  getLastestCars(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/car/getLatestCars`);
  }
  getCars(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getFilteredCars(inputFilter: FilterCarModel){
    return this.http.post<any>(`${this.baseUrl}/car/getFilteredCars`,inputFilter);
  }
  getFilter(){
    return this.http.get<any>(`${this.baseUrl}/car/getFilters`);
  }

  getCarDetailsById(carId: string){
    return this.http.get<any>(`${this.baseUrl}/car/getCarDetailsById?voitureId=` + carId);
  }
  //#region Request calls
  getAllRequests(){
    return this.http.get<any>(`${this.baseUrl}/request`);
  }
  deleteRequestById(requestId: number){
    const data ={
      requestId : requestId
    }
    return this.http.post<any>(`${this.baseUrl}/request/deleteRequestById`, data);
  }
  createRequest(requestToCreate: RequestModel){
    const data = {
      marque: requestToCreate.marque,
      modele: requestToCreate.modele,
      dateMiseCirculation: requestToCreate.dateMiseCirculation,
      carburant: requestToCreate.carburant,
      boiteVitesse: requestToCreate.boiteVitesse,
      kilometrage: requestToCreate.kilometrage,
      email: requestToCreate.email,
      telephone: requestToCreate.telephone
    }
    return this.http.post<any>(`${this.baseUrl}/request/saveRequest`, data);
  }
  //#endregion Request calls
}
