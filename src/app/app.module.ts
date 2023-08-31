import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { AdminComponent } from './components/admin/admin.component';
import { VendreVoitureComponent } from './components/vendre-voiture/vendre-voiture.component';
import { AcheterVoitureComponent } from './components/acheter-voiture/acheter-voiture.component';
import { CommentCaMarcheComponent } from './components/comment-ca-marche/comment-ca-marche.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { ServiceVoitureService } from './services/service-voiture.service';
import { DetailsVoitureComponent } from './components/details-voiture/details-voiture.component';
import { SharedService } from './services/shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsComponent } from './components/admin/tabs/requests/requests.component';
import { CollectionComponent } from './components/admin/tabs/collection/collection.component';
import { CreateVoitureComponent } from './components/admin/tabs/create-voiture/create-voiture.component';
import { FaqComponent } from './components/faq/faq.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { environment } from 'src/environments/environment';

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
    CarListComponent,
    DetailsVoitureComponent,
    RequestsComponent,
    CollectionComponent,
    CreateVoitureComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [ServiceVoitureService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
