import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//  importações manuais (colocar entre as importações existentes)

import { HttpClientModule } from '@angular/common/http'; // POSSIBILITA ENVIAR REQ POST, GET ETC.

/* IMPORTAÇÕES DA VIEW */
import { MatButtonModule } from '@angular/material/button';
import { ContatoService } from './contato.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContatoComponent } from './contato/contato.component';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    ContatoDetalheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //  colocar antes do BrowserAnimationsModule
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,

    HttpClientModule,

    BrowserAnimationsModule
  ],
  //  serviços sempre serão adicionados aos providers
  providers: [
    ContatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
