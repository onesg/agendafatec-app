/* CLASSE CONTATO */
export class Contato {
  id?: number;  /* obs: (?) = NÃO SÃO CAMPOS OBRIGATÓRIOS. */
  nome?: string;
  email?: string;
  favorito?: boolean;

  /* CONSTRUTOR COM ATRIBUTOS DE CONTATO */
  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

}
