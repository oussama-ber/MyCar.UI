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
    return this.http.get<any>(`${this.baseUrl}/car`);
  }
  getFilteredCars(inputFilter: FilterCarModel){
    return this.http.post<any>(`${this.baseUrl}/car/getFilteredCars`,inputFilter);
  }
  getFilter(){
    return this.http.get<any>(`${this.baseUrl}/car/getFilters`);
  }
  deleteCarById(carId: number){
    const data ={
      carId : carId
    }
    return this.http.post<any>(`${this.baseUrl}/car/deleteCarById`, data);
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
  acceptRequest(requestToUpdate: RequestModel){
    // const data ={
    //   requestId : requestId
    // }
    return this.http.put<any>(`${this.baseUrl}/request/acceptRequest`, requestToUpdate);
  }
  saveImage(requestToUpdate: string){
    const data ={
      fileBase64 : requestToUpdate
    }
    return this.http.post<any>(`${this.baseUrl}/request/saveImage`, data);
  }
  testImage(requestToUpdate: string, carId: string){
    const data = {
      imageUrl: requestToUpdate,
      carId: carId
    }
    return this.http.post<any>(`${this.baseUrl}/request/testImage`, data);
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
  createOffreVoiture(data: Object){
    return this.http.post<any>(`${this.baseUrl}/request/saveRequest`, data);
  }
  //#endregion Request calls
}
