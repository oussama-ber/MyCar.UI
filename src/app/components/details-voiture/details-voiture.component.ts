import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-voiture',
  templateUrl: './details-voiture.component.html',
  styleUrls: ['./details-voiture.component.scss']
})
export class DetailsVoitureComponent implements OnInit {

  constructor() { }
  selectedControl: number = 1;
  ngOnInit(): void {
  }

  updateSelectedControl(value: number){
    this.selectedControl = value;
  }
}
