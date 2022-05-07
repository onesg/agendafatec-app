/* CLASSE CONTATO */
export class Contato {
  id?: number;  /* obs: (?) = NÃO SÃO CAMPOS OBRIGATÓRIOS. */
  nome?: string;
  email?: string;
  telefone?: string;
  favorito?: boolean;
  foto?: any;

  /* CONSTRUTOR COM ATRIBUTOS DE CONTATO */
  constructor(nome: string, email: string, telefone: string) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

}
