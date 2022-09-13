import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';
import { ICurso } from '../ICurso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: ICurso[];
  cursos$!: Observable<ICurso[]>;
  
  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //this.service.list().subscribe((dados: ICurso[]) => this.cursos = dados);
    this.cursos$ = this.service.list();
  }



}
