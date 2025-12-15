using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.Application.Interfaces
{
    public interface ICategoriaService
    {
        Task<IEnumerable<CategoriaResponseDTO>> GetAllAsync();
        Task<CategoriaResponseDTO?> GetByIdAsync(int id);
        Task<CategoriaResponseDTO> CreateAsync(CategoriaCreateDTO dto);
        Task<CategoriaResponseDTO?> UpdateAsync(int id,CategoriaUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
