namespace ProjetoFinanceiro2025.Application.DTOs
{
    public class TransacaoResponseDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string Tipo { get; set; } = string.Empty;

        public int PessoaId { get; set; }
        public string PessoaNome { get; set; } = string.Empty;

        public int CategoriaId { get; set; }
        public string CategoriaDescricao { get; set; } = string.Empty;
    }
}
