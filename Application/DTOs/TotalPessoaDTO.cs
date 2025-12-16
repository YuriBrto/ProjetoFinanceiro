namespace ProjetoFinanceiro2025.Application.DTOs
{
    public class TotalPessoaDTO
    {
        public string Nome { get; set; } = string.Empty;
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal Saldo { get; set; }
    }
}
