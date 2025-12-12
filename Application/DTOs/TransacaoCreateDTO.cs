using ProjetoFinanceiro2025.Domain.Enums;

namespace ProjetoFinanceiro2025.Application.DTOs
{
    public class TransacaoCreateDTO
    {
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public int PessoaId { get; set; }
        public int CategoriaId { get; set; }
    }
}
