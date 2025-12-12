using ProjetoFinanceiro2025.Domain.Enums;

namespace ProjetoFinanceiro2025.Application.DTOs
{
    public class CategoriaUpdateDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
