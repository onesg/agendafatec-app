import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators, NgControlStatus } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';

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
  colunas = ['foto', 'nome', 'email', 'telefone', 'favorito', 'excluir'];

  /* VARIÁVEIS DE PAGINAÇÃO */
  totalElements: number = 0;
  page: number = 0;
  size: number = 5;
  pageSizeOptions: number[] = [5];

  /* CONTRUTOR */
  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  /* ASSIM QUE ABRIR A PÁGINA, O "ngOnInit" SERÁ EXECUTADO */
  ngOnInit(): void {

    /* CHAMANDO FORMULÁRIO */
    this.createForms();

    /* CHAMANDO MÉTODO findAll */
    this.findAll(this.page, this.size);

  }

  /* MÉTODO PARA CRIAR FORMULÁRIO */
  createForms() {
    this.formulario = this.fb.group({
      form_nome: ['', Validators.required], /* POR PADRÃO, UM VALOR VAZIO SERÁ PASSADO */
      form_email: ['', [Validators.required, Validators.email]], /* CAMPO ORBIGATÓRIO E VALIDAÇÃO DE EMAIL */
      form_telefone: ['', [Validators.required]],
    });
  }

  /* MÉTODO SUBMIT */
  submit() {

    /* PEGANDO OS VALORES DO FORMULÁRIO */
    const formValues = this.formulario.value;

    /* CRIANDO OBJETCO C DE CONTATO, INSTANCIANDO E SALVANDO AS INFORMAÇÕES */
    const c: Contato = new Contato(formValues.form_nome, formValues.form_email, formValues.form_telefone);

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

  /* MÉTODO PARA LISTAR OS CONTATOS (JÁ PAGINADOS) */
  findAll(page: any, size: any) {
    this.service.list(page, size).subscribe(resposta => {
      this.contatos = resposta.content!;
      this.totalElements = resposta.totalElements!;
      this.page = resposta.number!;
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
        this.findAll(this.page, this.size);
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
        this.findAll(this.page, this.size);
      });
    }
  }

  /* MÉTODO PARA VISUALIZAR A FOTO QUANDO CLICAR */
  viewContato(contato: Contato) {
    this.dialog.open(ContatoDetalheComponent, {
      width: '500px',
      height: '500px',
      data: contato
    });
  }

  /* MÉTODO PARA PÁGINAR DE ACORDO COM O EVENTO */
  paginar(event: PageEvent){
    this.page = event.pageIndex;
    this.findAll(this.page, this.size);
  }

}
