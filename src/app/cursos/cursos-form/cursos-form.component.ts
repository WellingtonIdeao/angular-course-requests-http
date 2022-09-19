import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CursosService } from './../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ICurso } from '../ICurso';
import { map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //let registro =null;
    // Código assíncrono - não sabemos/não tem como garantir o momento que será executado.
    // this.activatedroute.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     if (id) {
    //       const curso$ = this.cursoService.listById(id);
    //       curso$.subscribe((curso: ICurso) => {
    //           // registro = curso;
    //         this.updateForm(curso);
    //       });
    //     }
    //   }
    // );
    // //console.log(registro);

    // this.activatedroute.params.subcribe() - Observable - é controlado pelo Angular e faz unsubscribe automaticamente.
    // this.cursoService.listById(id) está usando take(1) que faz o unsubscribe.
    // this.activatedroute.params
    // .pipe(
    //   map((params: any) => {
    //     console.log(params['id']); 
    //     return params['id'];
    //   }),
    //   switchMap((id: number) => id? this.cursoService.listById(id) : of())
    //   // switchMap(cursos => obterAulas)
      
    // ).subscribe((curso: ICurso) => this.updateForm(curso));

    // Alguns operadores RxJS
    // switchMap - cancela as requisiçãos anteriores devolve o valor do ultimo pedido.
    // No exemplo acima, sempre cancela os IDs anteriores e devolve valor do ultimo ID.
    
    // concatMap -> ordem da requisição importa.
    // mergeMap -> ordem não importa.
    // exhaustMap -> faz a requisição e espera obter resposta antes de fazer uma proxíma/segunda tentativa. Comumente usada em casos de Login.
    
    const curso = this.activatedroute.snapshot.data['curso'];

    this.form = this.fb.group({
      id: curso.id,
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  // updateForm(curso: ICurso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.cursoService.create(this.form.value).subscribe({
        next: success => {
          this.modal.showAlertSuccess('Curso criado com sucesso!');
          this.location.back();
          //console.log('sucesso');
        },
        error: error => this.modal.showAlertDanger('Erro ao criar o curso, tente novamente!'), //console.error(error),
        complete: () => console.info('request completo')
      });
    }

  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

}
