import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICurso } from './ICurso';
import { Observable, tap } from 'rxjs';
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
      tap(console.log)
    );
  }

}
