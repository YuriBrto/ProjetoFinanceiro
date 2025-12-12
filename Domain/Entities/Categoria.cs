using ProjetoFinanceiro2025.Domain.Enums;

namespace ProjetoFinanceiro2025.Domain.Entities
{
    public class Categoria
    {
        public int Id { get; set; } // Identificador único -- solicitado
        public string Descricao { get; set; } = string.Empty;
        public FinalidadeCategoria Finalidade { get; set; }

        // Navegação entre transacão
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
