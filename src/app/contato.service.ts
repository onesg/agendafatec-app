import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Contato } from './contato/contato';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  /* SERVIÇO PARA SALVAR AS INFORMAÇÕES NO BANCO PELA API */
  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }

  /* SERVIÇO PARA LISTAR AS INFORMAÇÕES DO BANCO PELA API */
  list(): Observable<Contato[]> {
    return this.http.get<any>(this.url);
  }

  /* SERVIÇO PARA FAVORITAR CONTATO PELA API */
  favorite(contato: Contato): Observable<any> {
    return this.http.patch(`${this.url}/${contato.id}/favorito`, null);
  }

  /* SERVIÇO PARA DELETAR UM CONTAO PELA API */
  delete(contato: Contato): Observable<any> {
    return this.http.delete(`${this.url}/${contato.id}`);
  }

  /* SERVIÇO PARA UPLOAD DE FOTO PELA API */
  upload(contato: Contato, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${contato.id}/foto`, formData, {responseType: 'blob'});
  }

}
