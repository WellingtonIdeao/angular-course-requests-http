import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CursosService } from './../../cursos/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { ICurso } from 'src/app/cursos/ICurso';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() curso!: ICurso;


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
    this.cursoService.remove(this.curso.id)
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
