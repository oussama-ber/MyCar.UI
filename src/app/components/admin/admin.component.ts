import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
public isRequests : boolean = false ;
public isGallery : boolean = false ;
public isCreateVoiture : boolean = false ;
  constructor() { }

  ngOnInit(): void {
    this.isGallery = true;
    this.isRequests = false;
    this.isCreateVoiture = false;
  }
  onClickTab(tabName: string){
    switch (tabName) {
      case "requests":
        this.isRequests = true;
        this.isGallery = false;
        this.isCreateVoiture = false;
        break;
      case "gallery":
        this.isGallery = true;
        this.isRequests = false;
        this.isCreateVoiture = false;
        break;
      case "createVoiture":
        this.isCreateVoiture = true;
        this.isGallery = false;
        this.isRequests = false;
        break;
      default:
        this.isGallery = true;
        this.isRequests = false;
        this.isCreateVoiture = false;
        break;
    }
  }
}
