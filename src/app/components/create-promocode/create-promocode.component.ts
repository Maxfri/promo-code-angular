import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { v4 as uuidv4 } from 'uuid';

import { PromoCodeService } from 'src/app/services/promo-code.service';
import { PromoCodeNameValidator } from 'src/app/services/name-validator.service';

@Component({
  selector: 'app-create-promocode',
  templateUrl: './create-promocode.component.html',
  styleUrls: ['./create-promocode.component.scss'],
})
export class CreatePromoCodeComponent implements OnInit {
  promoCodeId: string | null;
  minDate: Date = new Date();
  form: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ], [this.promoCodeNameValidator.validateName.bind(this.promoCodeNameValidator)]),
    promoCode: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10)
    ]),
    description: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    dateOfExpiry: new FormControl<Date>(new Date()),
  });

  constructor(
    private promoCodeService: PromoCodeService,
    private promoCodeNameValidator: PromoCodeNameValidator,
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
    return this.form.get("title");
  }

  get promoCode() {
    return this.form.get("promoCode");
  }

  get description() {
    return this.form.get("description");
  }

  get dateOfExpiry() {
    return this.form.get("dateOfExpiry");
  }

  submit() {
    if (this.form.invalid) return;
    const promoCodeValue = this.promoCode?.value.trim();

    const formData = {
      title: this.form.value.title as string,
      description: this.form.value.description as string,
      promoCode: promoCodeValue as string,
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
