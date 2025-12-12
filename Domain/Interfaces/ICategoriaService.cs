using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.Application.Interfaces
{
    public interface ICategoriaService
    {
        Task<IEnumerable<CategoriaDTO>> GetAllAsync();
        Task<CategoriaDTO> GetByIdAsync(int id);
        Task<CategoriaDTO> CreateAsync(CategoriaCreateDTO dto);
        Task<CategoriaDTO> UpdateAsync(int id, CategoriaUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
