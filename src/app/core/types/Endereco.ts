/**
 * Interface que define a estrutura de um endereço no sistema
 * Contém todas as informações necessárias para representar um endereço completo
 */
export interface Endereco {
  /** ID único do endereço */
  id: number;
  /** Nome do país */
  pais: string
  /** Nome do estado/província */
  estado: string
  /** Nome da cidade */
  cidade: string
  /** Nome do bairro */
  bairro: string
  /** Código postal (CEP) */
  cep: string
  /** Nome da rua */
  rua: string
  /** Número do endereço */
  numero: string
}
