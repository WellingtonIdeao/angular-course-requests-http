import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, tap } from 'rxjs';

import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-take',
  template: `<app-poc-base [nome]="nome" [valor]="valor" estilo="bg-info"></app-poc-base>`
})
export class PocTakeComponent implements OnInit, OnDestroy {
    nome = "Componente com take";
    valor!: string;

  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
    this.service.getValor()
    .pipe(
      tap(v => console.log(this.nome, v)),
      take(1)
    )
    .subscribe((novoValor: string) => this.valor = novoValor);
  }

  ngOnDestroy(): void {
    console.log(`${this.nome} foi destruido`);
  }




}