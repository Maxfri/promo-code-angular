import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoCodesPageComponent } from './pages/promocodes-page/promo-codes-page.component';
import { CreatePromoCodePageComponent } from './pages/create-promocode-page/create-promocode-page.component';

const routes: Routes = [
  { path: '', component: PromoCodesPageComponent },
  { path: 'create', component: CreatePromoCodePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
