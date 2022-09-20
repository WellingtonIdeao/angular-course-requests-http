import { catchError, empty, Observable, of, Subject, tap, switchMap, EMPTY, delay, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';
import { ICurso } from '../ICurso';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    private actvatedRoute: ActivatedRoute,
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
    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover o curso?', 'Confirmar');
    result$.asObservable()
    .pipe(
      take(1),
      tap(console.log),
      switchMap( result=> result? this.service.remove(curso.id): EMPTY)
    ).subscribe({
      next: success => this.onRefresh(),
      error: error => {
        this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente');
      },
      complete: () => console.info('delete request completo') 
      
    });
  }
}
