import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MobxAngularModule } from 'mobx-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromoCodesPageComponent } from './pages/promocodes-page/promo-codes-page.component';
import { CreatePromoCodePageComponent } from './pages/create-promocode-page/create-promocode-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PromoCodeCardComponent } from './components/promo-code-card/promo-code-card.component';
import { CreatePromoCodeComponent } from './components/create-promocode/create-promocode.component';
import { MaterialModule } from '../material.module';
import { FilterPromoCodePipe } from './pipes/filter-promo-code.pipe';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PromoCodesPageComponent,
    CreatePromoCodeComponent,
    NavigationComponent,
    PromoCodeCardComponent,
    CreatePromoCodePageComponent,
    FilterPromoCodePipe,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MobxAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
