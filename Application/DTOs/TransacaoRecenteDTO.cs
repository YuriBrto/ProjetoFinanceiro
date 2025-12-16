namespace ProjetoFinanceiro2025.Application.DTOs
{
    public class TransacaoRecenteDTO
    {
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public string PessoaNome { get; set; } = string.Empty;
    }
}
