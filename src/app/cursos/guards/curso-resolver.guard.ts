import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ICurso } from '../ICurso';
import { CursosService } from './../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<ICurso>{

  constructor( private cursoService: CursosService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICurso> {
    if( route.params && route.params['id']){
      return this.cursoService.listById(route.params['id']);
    }
    return of(<ICurso>{});
  }
  
}
