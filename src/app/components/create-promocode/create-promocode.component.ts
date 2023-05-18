import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { v4 as uuidv4 } from 'uuid';

import { PromoCodeService } from 'src/app/services/promo-code.service';

@Component({
  selector: 'app-create-promocode',
  templateUrl: './create-promocode.component.html',
  styleUrls: ['./create-promocode.component.scss'],
})
export class CreatePromoCodeComponent implements OnInit {
  promoCodeId: string | null;
  minDate: Date = new Date();
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    promoCode: new FormControl<string>('', [
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

  constructor(private promoCodeService: PromoCodeService,
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute
  ) {
    this.dateAdapter.setLocale('ru-Ru');
  }

  ngOnInit() {
    this.promoCodeId = this.route.snapshot.paramMap.get('id');
    if (this.promoCodeId) {
      const promoCode = this.promoCodeService.getPromoCodeById(this.promoCodeId);
      promoCode.subscribe((promoCodeData) => {
        if (promoCodeData) {
          this.form.patchValue({
            title: promoCodeData.title,
            promoCode: promoCodeData.promoCode,
            description: promoCodeData.description,
            dateOfExpiry: promoCodeData.dateOfExpiry,
          });
        }
      });
    }
  }

  get title() {
    return this.form.controls.title as FormControl;
  }

  get promoCode() {
    return this.form.controls.promoCode as FormControl;
  }

  get description() {
    return this.form.controls.description as FormControl;
  }

  get dateOfExpiry() {
    return this.form.controls.dateOfExpiry as FormControl;
  }

  submit() {
    const formData = {
      title: this.form.value.title as string,
      description: this.form.value.description as string,
      promoCode: this.form.value.promoCode as string,
      dateOfExpiry: this.form.value.dateOfExpiry as Date,
    };

    if (this.promoCodeId) {
      this.promoCodeService.editPromoCode({
        id: this.promoCodeId,
        ...formData
      });
    } else {
      this.promoCodeService.addPromoCode({
        id: uuidv4(),
        ...formData
      });
    }

    this.form.reset();
  }
}
