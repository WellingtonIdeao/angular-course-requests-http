import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CursosService } from './../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

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
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)] ]
    });
  }
  
  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if( this.form.valid){
      console.log('Submit');
      this.cursoService.create(this.form.value).subscribe({
        next: success =>{
          this.modal.showAlertSuccess('Curso criado com sucesso!');
          this.location.back();
          //console.log('sucesso');
        }, 
        error: error =>  this.modal.showAlertDanger('Erro ao criar o curso, tente novamente!'), //console.error(error),
        complete: () => console.info('request completo')
      });
    }

  }
  onCancel(){
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

}
