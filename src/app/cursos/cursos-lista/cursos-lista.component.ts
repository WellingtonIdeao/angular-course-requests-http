import { catchError, empty, Observable, of, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';
import { ICurso } from '../ICurso';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: ICurso[];
  cursos$!: Observable<ICurso[]>;
  // Subject - objeto que pode emitir valores, neste caso boolean.
  error$ =  new Subject<boolean>();
  
  constructor(
    private service: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private  actvatedRoute: ActivatedRoute,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    //this.service.list().subscribe((dados: ICurso[]) => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      // map()
      // tap()
      // switchMap()
      catchError(error => {
        console.error(error);
        //this.error$.next(true);
        this.handleError();
        //return empty();
        return of();
      })
    );
    
    /* this.service.list().subscribe(
      dados =>{
        console.log(dados);
      },
      error => {
        this.error$.next(true);
        console.log(error);
      },
      ()=>{
        console.log('Observable completo!');
      }        
    );
      
    this.service.list()
    .pipe(
      catchError(error => empty())
    ).subscribe(
      dados =>{
        console.log(dados);
      }
    ) */ 
  }

  handleError() {
    this.alertModalService.showAlertDanger('Error ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id: number): void {
    // olhar depois
    // this.router.navigate(['editar', id]);
    this.router.navigate(['editar', id], { relativeTo: this.actvatedRoute});
  }

  onDelete(curso: ICurso){
    const modalRef = this._modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.curso = curso;
  }
}
