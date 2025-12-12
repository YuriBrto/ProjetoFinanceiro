using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.Application.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<PessoaResponseDTO>> GetAllAsync();
        Task<PessoaResponseDTO?> GetByIdAsync(int id);
        Task<PessoaResponseDTO> CreateAsync(PessoaCreateDTO dto);
        Task<bool> UpdateAsync(int id,PessoaUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
