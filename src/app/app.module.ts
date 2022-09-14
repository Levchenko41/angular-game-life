import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameLifeComponent } from './game-life/game-life.component';
import {enableProdMode} from '@angular/core';

enableProdMode();


@NgModule({
  declarations: [
    AppComponent,
    GameLifeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
