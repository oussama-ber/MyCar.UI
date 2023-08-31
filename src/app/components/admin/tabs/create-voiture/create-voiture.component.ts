import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';
import { mimeType } from './mime-type.validator';
import { Observable, ReplaySubject } from 'rxjs';
import * as fileSaver from 'file-saver';
import { CarModel, Entretien } from 'src/app/models/CarModel';
import { AngularFireStorage } from "@angular/fire/compat/storage"

@Component({
  selector: 'app-create-voiture',
  templateUrl: './create-voiture.component.html',
  styleUrls: ['./create-voiture.component.scss']
})
export class CreateVoitureComponent implements OnInit {
  createVoitureFormGeneral!: FormGroup;
  createVoitureFormEntretien!: FormGroup;
  createVoitureFormOptions!: FormGroup;
  etatExterieurForm!: FormGroup;
  etatInterieurForm!: FormGroup;
  controlMecanicqueFormPneumatiques!: FormGroup;
  carFormImages!: FormGroup;
  imagePreview: string = "";
  base64Output : string;
  formStep: number = 1;
  inputEntretien: string = "";
  inputAllEntretien: Entretien []= [];
  inputAllOptions: string []= [];
  inputAllEtatExterieur: string []= [];
  inputAllEtatInterieur: string []= [];
  selectedControl: number = 1;
  uploadedFiles: File [] = [];
  uploadedFileNames: string [] = [];
  constructor(private _fb : UntypedFormBuilder, private _voitureService: ServiceVoitureService, private fireStorage:AngularFireStorage) { }

  ngOnInit(): void {
    this.createVoitureFormGeneral = new FormGroup({
      marque: new FormControl(null),
      modele: new FormControl(null),
      dateMiseCirculation: new FormControl(null),
      carburant: new FormControl(null),
      boiteVitesse: new FormControl(null),
      kilometrage: new FormControl(null),
      email: new FormControl(""),
      telephone: new FormControl(null),
      prix: new FormControl(null),
      image: new FormControl("", {
        validators: [Validators.required] , asyncValidators: [mimeType]
      })
    });
    this.createVoitureFormOptions = new FormGroup({
      option: new FormControl(null, {validators: [Validators.required]})
    })
    this.etatExterieurForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]})
    })
    this.etatInterieurForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]})
    })
    this.createVoitureFormEntretien = new FormGroup({
      kilometrage: new FormControl(null),
      description: new FormControl(null),
      date: new FormControl(null)
    })
    this.controlMecanicqueFormPneumatiques = new FormGroup({
      aVGmarque: new FormControl(null),
      aVGdimensions: new FormControl(null),
      aVGprofondeurRestante: new FormControl(null),
      aVGtypePneu: new FormControl(null),

      aVDmarque: new FormControl(null),
      aVDdimensions: new FormControl(null),
      aVDprofondeurRestante: new FormControl(null),
      aVDtypePneu: new FormControl(null),

      aRGmarque: new FormControl(null),
      aRGdimensions: new FormControl(null),
      aRGprofondeurRestante: new FormControl(null),
      aRGtypePneu: new FormControl(null),

      aRDmarque: new FormControl(null),
      aRDdimensions: new FormControl(null),
      aRDprofondeurRestante: new FormControl(null),
      aRDtypePneu: new FormControl(null),

      aVplaque: new FormControl(null),
      aRplaque: new FormControl(null),

      aVdisque: new FormControl(null),
      aRdisque: new FormControl(null),

      distributionType: new FormControl(null),

      moteurNiveauHuile: new FormControl(null),
      moteurNiveauLiquideFrein: new FormControl(null),
      moteurNiveauRefroidissement: new FormControl(null),
      examenVisuelFruitesHuile: new FormControl(null),
      courroieAccessoire: new FormControl(null),
      etatBatterie: new FormControl(null),

      trainAvRotules: new FormControl(null),
      trainAVCardans: new FormControl(null),
      trainAVAmortisseurs: new FormControl(null),

      trainARRotules: new FormControl(null),
      trainARCardans: new FormControl(null),
      trainARAmortisseurs: new FormControl(null),

      resultatFinal: new FormControl(null),
      vitesseMax: new FormControl(null),


    })
    this.carFormImages = new FormGroup({
      image: new FormControl(null),

    })
  }
  submitVoiture(){
    if(this.createVoitureFormGeneral.valid){

      const data =
       {
        marque: this.createVoitureFormGeneral.controls['marque'].value,
        modele: this.createVoitureFormGeneral.controls['modele'].value,
        dateMiseCirculation :this.createVoitureFormGeneral.controls['dateMiseCirculation'].value,
        carburant: this.createVoitureFormGeneral.controls['carburant'].value,
        boiteVitesse: this.createVoitureFormGeneral.controls['boiteVitesse'].value,
        kilometrage: this.createVoitureFormGeneral.controls['kilometrage'].value,
        voiturecarburant: this.createVoitureFormGeneral.controls['carburant'].value,
        prix: this.createVoitureFormGeneral.controls['prix'].value,
        options: this.inputAllOptions,
        entretienHistory: this.inputAllEntretien,
        pneumatiques: {
          avg: {
            aVGmarque: this.controlMecanicqueFormPneumatiques.controls['aVGmarque'].value,
            aVGdimensions: this.controlMecanicqueFormPneumatiques.controls['aVGdimensions'].value,
            aVGprofondeurRestante: this.controlMecanicqueFormPneumatiques.controls['aVGprofondeurRestante'].value,
            aVGtypePneu: this.controlMecanicqueFormPneumatiques.controls['aVGtypePneu'].value,
          },
          avd: {
            aVDmarque: this.controlMecanicqueFormPneumatiques.controls['aVDmarque'].value,
            aVDdimensions: this.controlMecanicqueFormPneumatiques.controls['aVDdimensions'].value,
            aVDprofondeurRestante: this.controlMecanicqueFormPneumatiques.controls['aVDprofondeurRestante'].value,
            aVDtypePneu: this.controlMecanicqueFormPneumatiques.controls['aVDtypePneu'].value,
          },
          arg: {
            aRGmarque: this.controlMecanicqueFormPneumatiques.controls['aRGmarque'].value,
            aRGdimensions: this.controlMecanicqueFormPneumatiques.controls['aRGdimensions'].value,
            aRGprofondeurRestante: this.controlMecanicqueFormPneumatiques.controls['aRGprofondeurRestante'].value,
            aRGtypePneu: this.controlMecanicqueFormPneumatiques.controls['aRGtypePneu'].value,
          },
          ard: {
            aRDmarque: this.controlMecanicqueFormPneumatiques.controls['aRDmarque'].value,
            aRDdimensions: this.controlMecanicqueFormPneumatiques.controls['aRDdimensions'].value,
            aRDprofondeurRestante: this.controlMecanicqueFormPneumatiques.controls['aRDprofondeurRestante'].value,
            aRDtypePneu: this.controlMecanicqueFormPneumatiques.controls['aRDtypePneu'].value,
          },
        },
        freinage: {
          AvPlaque: this.controlMecanicqueFormPneumatiques.controls['aVplaque'].value,
          aRplaque: this.controlMecanicqueFormPneumatiques.controls['aRplaque'].value,
          aVdisque: this.controlMecanicqueFormPneumatiques.controls['aVdisque'].value,
          aRdisque: this.controlMecanicqueFormPneumatiques.controls['aRdisque'].value,
        },
        distributionType: this.controlMecanicqueFormPneumatiques.controls['distributionType'].value,
        moteur: {
          moteurNiveauHuile: this.controlMecanicqueFormPneumatiques.controls['moteurNiveauHuile'].value,
          moteurNiveauLiquideFrein: this.controlMecanicqueFormPneumatiques.controls['moteurNiveauLiquideFrein'].value,
          moteurNiveauRefroidissement: this.controlMecanicqueFormPneumatiques.controls['moteurNiveauRefroidissement'].value,
          examenVisuelFruitesHuile: this.controlMecanicqueFormPneumatiques.controls['examenVisuelFruitesHuile'].value,
          courroieAccessoire: this.controlMecanicqueFormPneumatiques.controls['courroieAccessoire'].value,
          etatBatterie: this.controlMecanicqueFormPneumatiques.controls['etatBatterie'].value,
        },
        chassis: {
          trainAvRotules: this.controlMecanicqueFormPneumatiques.controls['trainAvRotules'].value,
          trainAVCardans: this.controlMecanicqueFormPneumatiques.controls['trainAVCardans'].value,
          trainAVAmortisseurs: this.controlMecanicqueFormPneumatiques.controls['trainAVAmortisseurs'].value,

          trainARRotules: this.controlMecanicqueFormPneumatiques.controls['trainARRotules'].value,
          trainARCardans: this.controlMecanicqueFormPneumatiques.controls['trainARCardans'].value,
          trainARAmortisseurs: this.controlMecanicqueFormPneumatiques.controls['trainARAmortisseurs'].value,
        },
        testConduite: {
          resultatFinal: this.controlMecanicqueFormPneumatiques.controls['resultatFinal'].value,
          vitesseMax: this.controlMecanicqueFormPneumatiques.controls['vitesseMax'].value,
        },
        etatExterieur : this.inputAllEtatExterieur,
        etatInterieur : this.inputAllEtatInterieur,
      }



    }

  }
  updateSelectedControl(value: number){
    this.selectedControl = value;
  }
  onAddEtatExterieur(){
    let descriptionInput = this.etatExterieurForm.controls["title"].value;
    this.inputAllEtatExterieur = [...this.inputAllEtatExterieur, descriptionInput];
    this.etatExterieurForm.controls["title"].setValue(null);
  }
  onAddEtatInterieur(){
    let descriptionInput = this.etatInterieurForm.controls["title"].value;
    this.inputAllEtatInterieur = [...this.inputAllEtatInterieur, descriptionInput];
    this.etatInterieurForm.controls["title"].setValue(null);
  }
  onAddOption(){
    let descriptionInput = this.createVoitureFormOptions.controls["option"].value;
    this.inputAllOptions = [...this.inputAllOptions, descriptionInput];
    this.createVoitureFormOptions.controls["option"].setValue(null);
  }
  onAddEntretien(){
    let descriptionInput = this.createVoitureFormEntretien.controls["description"].value;
    let kilometrageInput = this.createVoitureFormEntretien.controls["kilometrage"].value;
    let dateInput = this.createVoitureFormEntretien.controls["date"].value;
    let createdEntretien = new Entretien();
    createdEntretien.description = descriptionInput;
    createdEntretien.kilometrage = kilometrageInput;
    createdEntretien.date = dateInput;
    this.inputAllEntretien = [...this.inputAllEntretien, createdEntretien];
    this.createVoitureFormEntretien.controls["description"].setValue(null);
    this.createVoitureFormEntretien.controls["kilometrage"].setValue(null);
    this.createVoitureFormEntretien.controls["date"].setValue(null);
  }
  onPreviousHandler(){
    if(this.formStep >1){
      this.formStep --;
    }
  }
  onNextHandler(){
    this.formStep ++;
  }
  async onImagePicked(event: any) {
    const file = event.target.files[0];
    if(file){
      this.uploadedFileNames = [...this.uploadedFileNames,file.name];
      this.uploadedFiles = [...this.uploadedFiles,file];
    }
    // let carId = "64ea912f50e50b39fb676781";
    // const file = event.target.files[0]
    // if(file){
    //   const path = `CarImages/${file.name}`;
    //   for (let index = 0; index < 2; index++) {
    //     console.log("index", index)
    //     let copyPath = path;
    //     copyPath = copyPath + new Date();
    //     const uploadTask =await this.fireStorage.upload(copyPath,file)
    //     const url = await uploadTask.ref.getDownloadURL()
    //     await this._voitureService.testImage(url, carId).subscribe((rs)=>{
    //       console.log(rs);
    //     })

    //   }
    // }
    // console.log(event)
    // console.log(event.target.files[0])
    // const file = event.target.files[0];
    // this.carFormImages.patchValue({ image: file });
    // this.carFormImages.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.carFormImages);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result as string;
    // };
    // reader.readAsDataURL(file);

  }
  downloadFile() {
    const base64Data = this.base64Output;
    const fileName = 'example.png';

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'application/octet-stream' });
    fileSaver.saveAs(blob, fileName);
  }
  onFileSelected(event: any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      this._voitureService.saveImage(this.base64Output).subscribe((response)=>{
        this.imagePreview = response.createdImage;
      })
      console.log("base64Output", this.base64Output)
    });
  }
  isValidString(){
    return this.base64Output && this.base64Output.length > 0;
  }
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

}
