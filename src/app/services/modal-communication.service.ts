import { Injectable } from '@angular/core';

@Injectable()
export class ModalCommunicationService {
  showModalStatus = {
    promoterCreateLinkModal: false,
  };

  constructor() {}

  get shouldShowPromoterCreateLinkModal() {
    return this.showModalStatus.promoterCreateLinkModal;
  }

  showPromoterCreateLinkModal() {
    this.showModalStatus.promoterCreateLinkModal = true;
  }

  hidePromoterCreateLinkModal() {
    this.showModalStatus.promoterCreateLinkModal = false;
  }

}
