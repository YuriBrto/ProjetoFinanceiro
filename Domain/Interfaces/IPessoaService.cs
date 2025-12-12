using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.Application.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<PessoaDTO>> GetAllAsync();
        Task<PessoaDTO> GetByIdAsync(int id);
        Task<PessoaDTO> CreateAsync(PessoaCreateDTO dto);
        Task<PessoaDTO> UpdateAsync(int id, PessoaUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
