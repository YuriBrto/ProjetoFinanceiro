using System.ComponentModel.DataAnnotations;

namespace ProjetoFinanceiro2025.Domain.Entities
{
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Nome { get; set; } = string.Empty;

        [Range(0, 150)]
        public int Idade { get; set; }

        // Navegação entre transação
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
