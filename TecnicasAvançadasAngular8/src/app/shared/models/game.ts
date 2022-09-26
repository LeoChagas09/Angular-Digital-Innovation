export interface Game {
  id?: number,
  nome: string,
  urlFoto?: string,
  dtLancamento: Date,
  descricao: string,
  preco: number,
  plataforma?: string,
  genero: string
}
