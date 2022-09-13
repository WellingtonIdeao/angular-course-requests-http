import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICurso } from './ICurso';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = ' http://localhost:3000/cursos'

  constructor(private http: HttpClient) { }

  list(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(this.API).
    pipe(
      tap(console.log)
    );
  }

}
