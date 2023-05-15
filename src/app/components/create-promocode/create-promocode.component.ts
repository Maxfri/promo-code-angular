import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromocodeService } from 'src/app/services/promocode.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-promocode',
  templateUrl: './create-promocode.component.html',
  styleUrls: ['./create-promocode.component.scss'],
})
export class CreatePromocodeComponent {
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

  constructor(private promocodeService: PromocodeService) {}

  get title() {
    return this.form.controls.title as FormControl;
  }

  submit() {
    this.promocodeService.create({
      id: uuidv4(),
      title: this.form.value.title as string,
      description: 'lorem ipsum set',
      promocode: uuidv4(),
      dateOfExpiry: new Date(),
    });
  }
}
