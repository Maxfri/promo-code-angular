import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromocodesPageComponent } from './pages/promocodes-page/promocodes-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePromocodePageComponent } from './pages/create-promocode-page/create-promocode-page.component';
import { NavigateComponent } from './components/navigate/navigate.component';

@NgModule({
  declarations: [
    AppComponent,
    PromocodesPageComponent,
    CreatePromocodePageComponent,
    NavigateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
