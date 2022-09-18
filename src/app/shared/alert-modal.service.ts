import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: NgbModal) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeOut?: number){
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.message = message;
    if (dismissTimeOut){
      setTimeout(()=> modalRef.dismiss(), dismissTimeOut); 
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }
}
