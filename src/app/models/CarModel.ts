export interface CarModel{
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