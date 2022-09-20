import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CursosService } from './../../cursos/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() id!: number;


  constructor(
    public modal: NgbActiveModal,
    private cursoService: CursosService,
    private router: Router,
    private alertModalService: AlertModalService
  ) {}
  
  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onConfirmDelete(){
    //console.log('onConfirmDelete');
    this.cursoService.remove(this.id)
    .subscribe({
      next: success => {
        this.alertModalService.showAlertSuccess('Curso removido com sucesso!');
        this.router.navigate(['']);
      },
      error: error => this.alertModalService.showAlertDanger('Error ao remover curso. Tente novamente mais tarde.')
    });
    this.modal.close('Ok click');
    
  }
  onDeclineDelete(){
    //console.log('onDeclineDelete');
    this.modal.dismiss('cancel click');
  }
}
