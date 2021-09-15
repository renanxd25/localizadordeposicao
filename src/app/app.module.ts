import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFireModule } from '@angular/fire/';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
//import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    Geolocation,
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
