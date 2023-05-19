import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromoCodeService } from './promo-code.service';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeNameValidator implements AsyncValidator {
  constructor(private promoCodeService: PromoCodeService) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.promoCodeService.getAllPromoCodes().pipe(
      map(promoCodes => {
        const nameExists = promoCodes.some((item) => item.title === control.value);
        return nameExists ? { uniqueName: true } : null;
      })
    );
  }
}
