import { Component, OnInit } from '@angular/core';
import { RequestModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(private _voitureService: ServiceVoitureService) { }
  requests : RequestModel[] = []
  requestsIsLoaded : boolean = false;
  ngOnInit(): void {
    this.getRequests()
  }
  getRequests(){
    this._voitureService.getAllRequests().subscribe((response)=>{
      this.requests = response.allRequests;
      this.requestsIsLoaded = true ;
      console.log("id", this.requests[0]._id)
    });
  }
  deleteRequestById(requestId: number){
    // deleteRequestById
    this._voitureService.deleteRequestById(requestId).subscribe((response)=>{
     console.log("response", response);
    });
  }

}
