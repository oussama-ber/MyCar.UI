export class CarModel{

  _id: number = 0;
  marque: string= "";
  modele: string= "";
  dateMiseCirculation: Date= new Date();
  carburant: string= "";
  boiteVitesse: string= "";
  kilometrage: string= "";
  options: string[]= []
  entretienHistory: string= "";
  etatExterieur: object[] = []
  etatInterieur: object[] = []
  tag: string= "";
  createdDate: Date= new Date();
  prix: number= 0;
  constructor(
     _id: number,
     marque: string,
     modele: string,
     dateMiseCirculation: Date,
     carburant: string,
     boiteVitesse: string,
     kilometrage: string,
     options: string[],
     entretienHistory: string,
     etatExterieur: object[],
     etatInterieur: object[],
     tag: string,
     createdDate: Date,
     prix: number
  ) {
    this._id = _id ;
    this.marque = marque ;
    this.modele = modele ;
    this.dateMiseCirculation = dateMiseCirculation ;
    this.carburant = carburant ;
    this.boiteVitesse = boiteVitesse ;
    this.kilometrage = kilometrage ;
    this.options = options || [];
    this.entretienHistory = entretienHistory ;
    this.etatExterieur = etatExterieur || [];
    this.etatInterieur = etatInterieur || [];
    this.tag = tag;
    this.createdDate = createdDate;
    this.prix = prix;
  }
}
export class CarModelImage{
  car: CarModel;
  image: ImageModel;
}
export class ImageModel{
  _id: string = "0"
  voitureId: string = "";
  fileURL: string = "";
}
export class RequestModel{
  _id: number = 0
  marque: string = "";
  modele: string = "";
  dateMiseCirculation: string = "";
  carburant: string= "";
  boiteVitesse: string= "";
  kilometrage: number = 0;
  createdDate: Date = new Date();
  email : string = "";
  telephone : number = 0;
  tag: string = '';
}
export class FilterCarModel{
  prixMin: number = 0;
  prixMax: number= 0;
  marque: string [] = [];
  modele: string [] =[];
  kilometrageMin: number = 0;
  kilometrageMax: number= 0;
  dateMin: number = 0;
  dateMax: number = 0;
  carburant: string [] = [];
  boiteVitesse: string [] = [];
}
export class Entretien{
  voitureId: number = 0;
  date: Date= new Date();
  kilometrage: string = "";
  description: string = "";
}
