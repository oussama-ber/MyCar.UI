import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
public isRequests : boolean = false ;
public isGallery : boolean = false ;
  constructor() { }

  ngOnInit(): void {
  }
  onClickTab(tabName: string){
    switch (tabName) {
      case "requests":
        this.isRequests = true;
        this.isGallery = false;
        break;
      case "gallery":
        this.isGallery = true;
        this.isRequests = false;
        break;
      default:
        this.isGallery = true;
        this.isRequests = false;
        break;
    }
  }

}
