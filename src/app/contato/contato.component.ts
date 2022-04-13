import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators, NgControlStatus } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  colunas = ['foto', 'nome', 'email', 'favorito', 'excluir'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  /* ASSIM QUE ABRIR A PÁGINA, O "ngOnInit" SERÁ EXECUTADO */
  ngOnInit(): void {

    /* CHAMANDO FORMULÁRIO */
    this.createForms();

    /* CHAMANDO MÉTODO findAll */
    this.findAll();

  }

  /* MÉTODO PARA CRIAR FORMULÁRIO */
  createForms() {
    this.formulario = this.fb.group({
      form_nome: ['', Validators.required], /* POR PADRÃO, UM VALOR VAZIO SERÁ PASSADO */
      form_email: ['', [Validators.required, Validators.email]] /* CAMPO ORBIGATÓRIO E VALIDAÇÃO DE EMAIL */
    });
  }

  /* MÉTODO SUBMIT */
  submit() {

    /* PEGANDO OS VALORES DO FORMULÁRIO */
    const formValues = this.formulario.value;

    /* CRIANDO OBJETCO C DE CONTATO, INSTANCIANDO E SALVANDO AS INFORMAÇÕES */
    const c: Contato = new Contato(formValues.form_nome, formValues.form_email);

    /* EXECUTANDO O MÉTODO SAVE MANDANDO O OBJETO PREENCHIDO */
    this.service.save(c).subscribe(resposta => {
      this.snackBar.open('Contato adicionado com sucesso!', 'Sucesso', {
        duration: 2000
      });
      this.formulario.reset; /* LIMPANDO OS VALORES */
      let lista: Contato[] = [...this.contatos, resposta];
      this.contatos = lista;
    })

  }

  /* MÉTODO PARA LISTAR OS CONTATOS */
  findAll() {
    this.service.list().subscribe(resposta => {
      this.contatos = resposta;
    })
  }

  /* MÉTODO PARA FAVORITAR CONTATOS */ /* NAO ESTA FUNCIONANDO */
  favorite(contato: Contato) {
    this.service.favorite(contato).subscribe(resposta => {
      contato.favorito = !contato.favorito;
      //console.log(contato.favorito);
    })
  }

  /* MÉTODO PARA DELETAR CONTATO */
  delete(contato: Contato) {
    if (window.confirm('Deseja realmente excluir este contato ?')) {
      this.service.delete(contato).subscribe(resposta => {
        this.findAll();
      })
    }
  }

  /* MÉTODO PARA UPLOAD DA FOTO DO CONTATO */
  uploadPicture(event: any, contato: Contato) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service.upload(contato, formData).subscribe(response => {
        this.findAll();
      });
    }
  }

}
