import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';

import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-unsub',
  template: `<app-poc-base [nome]="nome" [valor]="valor" estilo="bg-secondary"></app-poc-base>`
})
export class PocUnsubComponent implements OnInit, OnDestroy {
    nome = "Componente com unsubscribe";
    valor!: string;
    sub: Subscription[] = [];

  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
    this.sub.push(this.service.getValor()
    .pipe(tap(v => console.log(this.nome, v)))
    .subscribe((novoValor: string) => this.valor = novoValor)
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
    //this.sub.unsubscribe();
    console.log(`${this.nome} foi destruido`);
  }

}