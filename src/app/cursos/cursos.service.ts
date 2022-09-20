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

  listById(id: number): Observable<ICurso> {
    return this.http.get<ICurso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso: ICurso): Observable<ICurso>{
    return this.http.post<ICurso>(this.API, curso).pipe(take(1));
  }
  private update(curso: ICurso): Observable<ICurso>{
    return this.http.put<ICurso>(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: ICurso): Observable<ICurso> {
    if (curso.id){
      return this.update(curso);
    }
    return this.create(curso);
  }

  remove(id: number): Observable<ICurso> {
    return this.http.delete<ICurso>(`${this.API}/${id}`).pipe(take(1));
  }


}
