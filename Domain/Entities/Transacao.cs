using ProjetoFinanceiro2025.Domain.Enums;

namespace ProjetoFinanceiro2025.Domain.Entities
{
    public class Transacao
    {
        public int Id { get; set; } // Identificador único -- solicitado
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }

        // Relação com Pessoa N-1
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }

        // Relação com Categoria N-1
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
    }
}
