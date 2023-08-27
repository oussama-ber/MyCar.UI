import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AdminComponent } from './components/admin/admin.component';
import { AcheterVoitureComponent } from './components/acheter-voiture/acheter-voiture.component';
import { CommentCaMarcheComponent } from './components/comment-ca-marche/comment-ca-marche.component';
import { VendreVoitureComponent } from './components/vendre-voiture/vendre-voiture.component';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [
  { path: 'admin', component: AdminComponent},
  { path: 'achetervoiture', component: AcheterVoitureComponent},
  { path: 'vendrevoiture', component: VendreVoitureComponent},
  { path: 'commentcamarche', component: CommentCaMarcheComponent},
  { path: '', component: LandingComponent},
  { path: '**', component: LandingComponent}
];

@NgModule({
  imports: [BrowserModule,
            RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
