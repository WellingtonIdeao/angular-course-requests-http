import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  private emissor$ = new Subject<string>();
  constructor() { }

  emitirValor(value: string) {
    this.emissor$.next(value);
  }
  getValor(): Observable<string> {
    return this.emissor$.asObservable();
  }  

}
