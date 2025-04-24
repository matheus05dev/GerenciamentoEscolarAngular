/**
 * Interface genérica que define a estrutura de resposta paginada
 * Utilizada para retornar listas de dados com informações de paginação
 * @template T Tipo dos itens na lista
 */
export interface PageResponse<T> {
  /** Lista de itens da página atual */
  content: T[];
  /** Número total de itens em todas as páginas */
  totalElements: number;
  /** Número total de páginas */
  totalPages: number;
  /** Tamanho da página (número de itens por página) */
  size: number;
  /** Número da página atual (começando em 0) */
  number: number;
}
