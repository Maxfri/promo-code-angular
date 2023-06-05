import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeStore } from '../store/store';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeNameValidator {
  constructor(private promoCodeStore: PromoCodeStore) { }

  validateName(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.promoCodeStore.getPromoCodes().pipe(
      map(promoCodes => {
        const nameExists = promoCodes.some((item) => item.title === control.value);
        return nameExists ? { uniqueName: true } : null;
      })
    );
  }
}
