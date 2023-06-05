import { Component } from '@angular/core';
import { PromoCodeStore } from 'src/app/store/store';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(private promoCodeStore: PromoCodeStore,) { }

  close() {
    this.promoCodeStore.handleCloseModal();
  }
}
