import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, AbstractControl } from '@angular/forms';
import { RequestModel } from 'src/app/models/CarModel';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';


@Component({
  selector: 'app-vendre-voiture',
  templateUrl: './vendre-voiture.component.html',
  styleUrls: ['./vendre-voiture.component.scss']
})
export class VendreVoitureComponent implements OnInit {
  requestForm!: FormGroup;
  requestToCreate : RequestModel = new RequestModel();
  constructor(private _fb : UntypedFormBuilder, private _voitureService: ServiceVoitureService) { }

  ngOnInit(): void {
    this.requestForm = this._fb.group({
      marque: [""],
      modele: [null],
      dateMiseCirculation: [null],
      carburant: [null],
      boiteVitesse: [null],
      kilometrage: [null],
      email: [""],
      telephone: [null],
    })
  }
  initializeForm(){
    this.requestForm.controls["marque"].setValue("");
    this.requestForm.controls["modele"].setValue(null);
    this.requestForm.controls["dateMiseCirculation"].setValue(null);
    this.requestForm.controls["carburant"].setValue(null);
    this.requestForm.controls["boiteVitesse"].setValue(null);
    this.requestForm.controls["kilometrage"].setValue(null);
    this.requestForm.controls["email"].setValue(null);
    this.requestForm.controls["telephone"].setValue(null);
  }
  submitRequest(){
    let marqueInput = this.requestForm.controls["marque"].value;
    let modeleInput = this.requestForm.controls["modele"].value;
    let dateMiseCirculationInput = this.requestForm.controls["dateMiseCirculation"].value;
    let carburantInput = this.requestForm.controls["carburant"].value;
    let boiteVitesseInput = this.requestForm.controls["boiteVitesse"].value;
    let kilometrageInput = this.requestForm.controls["kilometrage"].value;
    let emailInput = this.requestForm.controls["email"].value;
    let telephoneInput = this.requestForm.controls["telephone"].value;
    const requestToCreate = new RequestModel();
    requestToCreate.marque = marqueInput
    requestToCreate.modele = modeleInput
    requestToCreate.dateMiseCirculation = dateMiseCirculationInput
    requestToCreate.carburant = carburantInput
    requestToCreate.boiteVitesse = boiteVitesseInput
    requestToCreate.kilometrage = kilometrageInput
    requestToCreate.email = emailInput
    requestToCreate.telephone = telephoneInput
    this._voitureService.createRequest(requestToCreate).subscribe((response)=>{
      // console.log("response", response)
    })
    this.initializeForm();
  }

}
