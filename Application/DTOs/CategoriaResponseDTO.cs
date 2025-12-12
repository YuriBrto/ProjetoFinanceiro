namespace ProjetoFinanceiro2025.Application.DTOs
{
    public class CategoriaResponseDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string Finalidade { get; set; } = string.Empty;
    }
}
