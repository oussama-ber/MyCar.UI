import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { AcheterVoitureComponent } from './components/acheter-voiture/acheter-voiture.component';
import { CommentCaMarcheComponent } from './components/comment-ca-marche/comment-ca-marche.component';
import { VendreVoitureComponent } from './components/vendre-voiture/vendre-voiture.component';
import { BrowserModule } from '@angular/platform-browser';
import { DetailsVoitureComponent } from './components/details-voiture/details-voiture.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent},
  { path: 'carlist', component: CarListComponent},
  { path: 'achetervoiture', component: AcheterVoitureComponent},
  { path: 'detailsvoiture', component: DetailsVoitureComponent},
  { path: 'vendrevoiture', component: VendreVoitureComponent},
  { path: 'commentcamarche', component: CommentCaMarcheComponent},
  { path: '', component: LandingComponent},
  { path: '**', component: LandingComponent},
];

@NgModule({
  imports: [BrowserModule,
            RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
