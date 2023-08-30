import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FilterCarModel } from '../models/CarModel';
@Injectable()
export class SharedService {
  private filterObservable = new Subject<{ filterInput: FilterCarModel}>();
  private filter:  FilterCarModel = new FilterCarModel () ;
  constructor() { }

  getFilter(): Observable<any>{
    return this.filterObservable.asObservable();
    return this.filterObservable.asObservable();
  }
  getfilterVariable(){
    return this.filter;
  }
  setFiler(filterInput: FilterCarModel){
    this.filter = {...filterInput};
    // this.filterObservable.next({ filterInput: filterInput });
    // console.log("filterInput from the shared service", filterInput)
  }
}
