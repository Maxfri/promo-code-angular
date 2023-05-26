import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromoCodeService } from './promo-code.service';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeNameValidator {
  constructor(private promoCodeService: PromoCodeService) { }

  validateName(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.promoCodeService.getAllPromoCodes().pipe(
      map(promoCodes => {
        const nameExists = promoCodes.some((item) => item.title === control.value);
        console.log(nameExists);
        return nameExists ? { uniqueName: true } : null;
      })
    );
  }
}
