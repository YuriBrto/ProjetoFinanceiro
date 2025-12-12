namespace ProjetoFinanceiro2025.Domain.Entities
{
    public class Pessoa
    {
        public int Id { get; set; }  // Identificador único -- solicitado
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }

        // Navegação entre transação
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
