import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocodesPageComponent } from './pages/promocodes-page/promocodes-page.component';
import { CreatePromocodePageComponent } from './pages/create-promocode-page/create-promocode-page.component';

const routes: Routes = [
  { path: '', component: PromocodesPageComponent },
  { path: 'create', component: CreatePromocodePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
