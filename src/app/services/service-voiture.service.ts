import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class ServiceVoitureService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl: string = "http://localhost:5000/api/car";

  getLastestCars(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/car/getLatestCars');
  }
  getCars(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/car');
  }
}
