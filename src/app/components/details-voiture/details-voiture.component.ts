import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ServiceVoitureService } from 'src/app/services/service-voiture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-voiture',
  templateUrl: './details-voiture.component.html',
  styleUrls: ['./details-voiture.component.scss']
})
export class DetailsVoitureComponent implements OnInit {
  isFullscreen: boolean;

  constructor(private _voitureService: ServiceVoitureService, private router: Router, private renderer: Renderer2) { }
  selectedControl: number = 1;
  details: any = null;
  imgList: string[] = [
                        '../../../assets/Ford-Mondeo-1.png',
                        '../../../assets/Ford-Mondeo-2.png',
                        '../../../assets/Ford-Mondeo-3.png',
                        '../../../assets/Ford-Mondeo-4.png',
                      ]
  
  selectedMainImage : string = this.imgList[0];

  //mainImage: HTMLImageElement = document.querySelector('main-image');
  //fullPage : HTMLElement = document.querySelector('#fullPage');
  @ViewChild('mainImg') mainImg : ElementRef ;
  @ViewChild('fullPage') fullPage: ElementRef;
  
  ngOnInit(): void {

    let carId = this.router.url.split('?')[1].split('=')[1];
    this._voitureService.getCarDetailsById(carId).subscribe((res) => {
      this.details = res;
      this.selectedMainImage  = this.imgList[0];
    }, (err)=>{console.error(err)})


    // this.mainImage.addEventListener('click', function() {
    //   fullPage.style.backgroundIamge = 'url(' + this.mainImage.src + ')';
    //   this.fullPage.style.display = 'block';
    // });

  }

  zoom(){
    debugger
    //const bla = this.fullPage.nativeElement as HTMLElement;
    //bla.style.display = 'block';
    //bla.style.backgroundImage = 'url(' + this.mainImg.nativeElement.src + ')';
    this.renderer.setStyle(this.fullPage, 'background-image', 'url'+this.mainImg.nativeElement.src+')');
    this.renderer.setStyle(this.fullPage, 'display', 'block');

  }

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;

      if (this.isFullscreen) {
        //const fullscreenContainer = document.querySelector('.fullscreen-container');
        //fullscreenContainer?.requestFullscreen(); // Enter fullscreen mode
      } else {
        //document.exitFullscreen(); // Exit fullscreen mode
        
        window.scroll({ 
          top: 0, 
          left: 0,
          behavior: 'auto' 
   });
      }
  }

  closeZoom(){
    this.fullPage.nativeElement.style.display = 'none';
  }

  updateSelectedControl(value: number){
    this.selectedControl = value;
  }

  switchImage(num: number) {
    this.selectedMainImage = this.imgList[num]
  }
}
