import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  /* GRUPO DE COMPONENTES */
  formulario!: FormGroup; /* (!) SERVE PARA DIZER QUE A VARIÁVEL "PODE" SER USADA ALGUM DIA */

  constructor(private service: ContatoService,
    private fb: FormBuilder) { }

  /* ASSIM QUE ABRIR A PÁGINA, O "ngOnInit" SERÁ EXECUTADO */
  ngOnInit(): void {

    this.formulario = this.fb.group({
      form_nome: ['', Validators.required], /* POR PADRÃO, UM VALOR VAZIO SERÁ PASSADO. */
      form_email: ['', Validators.required] /* "required" É UM CAMPO OBRIGATÓRIO */
    })

  }

  submit(){
    console.log(this.formulario.value);
    /*this.service.save(c).subscribe( resposta => {
      console.log(resposta);
    })*/
  }

}
