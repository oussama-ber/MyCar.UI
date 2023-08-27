import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { AdminComponent } from './components/admin/admin.component';
import { VendreVoitureComponent } from './components/vendre-voiture/vendre-voiture.component';
import { AcheterVoitureComponent } from './components/acheter-voiture/acheter-voiture.component';
import { CommentCaMarcheComponent } from './components/comment-ca-marche/comment-ca-marche.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    AdminComponent,
    VendreVoitureComponent,
    AcheterVoitureComponent,
    CommentCaMarcheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
