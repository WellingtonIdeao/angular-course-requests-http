import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICurso } from './ICurso';
import { delay, Observable, tap, take } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(this.API).
    pipe(
      delay(2000),
      tap(console.log)
    );
  }

  create(curso: ICurso){
    return this.http.post(this.API, curso).pipe(take(1));
  }

}
