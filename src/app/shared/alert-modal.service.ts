import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

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

  showConfirm(title: string, body: string, okTxt?: string, cancelTxt?: string ){
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = body;
    modalRef.componentInstance.confirmResult = new Subject();
    
    
    if (okTxt){
      modalRef.componentInstance.okTxt = okTxt;
    }
    if (cancelTxt){
      modalRef.componentInstance.cancelTxt = cancelTxt;
    }
    
    return (<ConfirmModalComponent>modalRef.componentInstance).confirmResult;
  }
}
