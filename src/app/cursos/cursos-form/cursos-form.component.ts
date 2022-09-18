import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) { }

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
