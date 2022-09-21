import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from './../shared/crud-service';
import { ICurso } from './ICurso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
// padrão repository
export class Curso2Service  extends CrudService <ICurso>{

  constructor(protected override http: HttpClient){
    super(http, `${environment.API}cursos`);
  }

}
