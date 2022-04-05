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

  /* VETOR COM A LISTA DE CONTATOS */
  contatos: Contato[] = [];

  /* VETOR COM AS COLUNAS DA TABELA DE CONTATOS */
  colunas = ['id','nome','email','favorito'];

  constructor(private service: ContatoService,
    private fb: FormBuilder) { }

  /* ASSIM QUE ABRIR A PÁGINA, O "ngOnInit" SERÁ EXECUTADO */
  ngOnInit(): void {

    /* CHAMANDO FORMULÁRIO */
    this.createForms();

  }

  /* MÉTODO PARA CRIAR FORMULÁRIO */
  createForms(){
    this.formulario = this.fb.group({
      form_nome: ['', Validators.required], /* POR PADRÃO, UM VALOR VAZIO SERÁ PASSADO */
      form_email: ['', [Validators.required, Validators.email]] /* CAMPO ORBIGATÓRIO E VALIDAÇÃO DE EMAIL */
    });
  }

  /* MÉTODO SUBMIT */
  submit(){

    /* PEGANDO OS VALORES DO FORMULÁRIO */
    const formValues = this.formulario.value;

    /* CRIANDO OBJETCO C DE CONTATO, INSTANCIANDO E SALVANDO AS INFORMAÇÕES */
    const c : Contato = new Contato(formValues.form_nome, formValues.form_email);

    /* EXECUTANDO O MÉTODO SAVE MANDANDO O OBJETO PREENCHIDO */
    this.service.save(c).subscribe( resposta => {
      this.contatos.push(resposta);
      console.log(this.contatos); /* EXIBINDO A REPOSTA NO CONSOLE */
      this.formulario.reset; /* LIMPANDO OS VALORES */
    })

  }

}
