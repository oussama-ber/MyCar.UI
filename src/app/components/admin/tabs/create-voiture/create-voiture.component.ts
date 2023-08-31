import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';
import { mimeType } from './mime-type.validator';
import { Observable, ReplaySubject } from 'rxjs';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-create-voiture',
  templateUrl: './create-voiture.component.html',
  styleUrls: ['./create-voiture.component.scss']
})
export class CreateVoitureComponent implements OnInit {
  createVoitureForm!: FormGroup;
  imagePreview: string = "";
  base64Output : string;

  constructor(private _fb : UntypedFormBuilder, private _voitureService: ServiceVoitureService) { }

  ngOnInit(): void {
    this.createVoitureForm = new FormGroup({
      marque: new FormControl(null),
      modele: new FormControl(null),
      dateMiseCirculation: new FormControl(null),
      carburant: new FormControl(null),
      boiteVitesse: new FormControl(null),
      kilometrage: new FormControl(null),
      email: new FormControl("null"),
      telephone: new FormControl(null),
      image: new FormControl("", {
        validators: [Validators.required] , asyncValidators: [mimeType]
      })
    })
  }
  submitVoiture(){}
  onImagePicked(event: any) {
    console.log(event)
    console.log(event.target.files[0])
    const file = event.target.files[0];
    this.createVoitureForm.patchValue({ image: file });
    // this.createVoitureForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.createVoitureForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
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
