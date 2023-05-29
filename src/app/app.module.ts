import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MobxAngularModule } from 'mobx-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';

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
import { InfiniteListComponent } from './components/infinite-list/infinite-list.component';
import { SearchComponent } from './components/search/search.component';
import { HighlightDirective } from './directives/highlight/highlight.directive';

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
    InfiniteListComponent,
    SearchComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MobxAngularModule,
    InfiniteScrollModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
