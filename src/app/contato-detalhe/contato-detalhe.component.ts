import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Contato } from '../contato/contato';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css']
})
export class ContatoDetalheComponent implements OnInit {

  constructor(

    /* Injectando os dados do contato em uma caixa de dialogo */
    public dialogRef: MatDialogRef<ContatoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato

  ) { }

  ngOnInit(): void {
  }

  /* MÉTODO PARA FECHAR A CAIXA DE DIALOGO */
  closeWindow(){
    this.dialogRef.close();
  }

}
