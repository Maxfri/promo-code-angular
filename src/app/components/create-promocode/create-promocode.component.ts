import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-promocode',
  templateUrl: './create-promocode.component.html',
  styleUrls: ['./create-promocode.component.scss'],
})
export class CreatePromoCodeComponent {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    promocode: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
    ]),
    description: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    dateOfExpiry: new FormControl<Date>(new Date()),
  });

  constructor(private promoCodeService: PromoCodeService) {
  }


  get title() {
    return this.form.controls.title as FormControl;
  }

  get promocode() {
    return this.form.controls.promocode as FormControl;
  }

  get description() {
    return this.form.controls.description as FormControl;
  }

  get dateOfExpiry() {
    return this.form.controls.dateOfExpiry as FormControl;
  }

  submit() {
    this.promoCodeService.addPromoCode({
      id: uuidv4(),
      title: this.form.value.title as string,
      description: this.form.value.description as string,
      promocode: this.form.value.promocode as string,
      dateOfExpiry: this.form.value.dateOfExpiry as Date,
    });
  }
}
