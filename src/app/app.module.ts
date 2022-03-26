import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//  importações manuais (colocar entre as importações existentes)
import { MatButtonModule } from '@angular/material/button';
import { ContatoService } from './contato.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContatoComponent } from './contato/contato.component';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //  colocar antes do BrowserAnimationsModule
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,

    BrowserAnimationsModule
  ],
  //  serviços sempre serão adicionados aos providers
  providers: [
    ContatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
