/**
 * Interface que define a estrutura de um curso no sistema
 * Contém as informações básicas necessárias para representar um curso
 * Esta interface é utilizada em toda a aplicação para tipagem de dados de cursos
 */
export interface Curso {
  /**
   * ID único do curso
   * @type {number}
   * Identificador único no banco de dados
   */
  id: number,

  /**
   * Área tecnológica à qual o curso pertence
   * @type {string}
   * Exemplo: "Desenvolvimento Web", "Redes", "Banco de Dados"
   */
  areaTecnologica: string,

  /**
   * Título ou nome do curso
   * @type {string}
   * Nome completo do curso como será exibido
   */
  titulo: string,

  /**
   * Modalidade de ensino do curso
   * @type {string}
   * Exemplo: "Presencial", "EAD", "Híbrido"
   */
  modalidade: string,

  /**
   * URL da imagem associada ao curso
   * @type {string}
   * Caminho para a imagem que representa o curso
   */
  imagemUrl: string
}
