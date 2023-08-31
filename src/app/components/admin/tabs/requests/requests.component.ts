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
  async ngOnInit(): Promise<void> {
    await this.getRequests();
  }
  async getRequests(){
    this._voitureService.getAllRequests().subscribe((response)=>{
      this.requests = response.allRequests;
      this.requestsIsLoaded = true ;
    });
  }
  deleteRequestById(requestId: number){
    // deleteRequestById
    this._voitureService.deleteRequestById(requestId).subscribe((response)=>{
      this.getRequests();
    });
  }
  acceptRequest(requestToUpdate: RequestModel){
    // deleteRequestById
    this._voitureService.acceptRequest(requestToUpdate).subscribe(async (response)=>{
      console.log("response",response);
      await this.getRequests();
    });
  }

}
