using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.Application.Interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<TransacaoDTO>> GetAllAsync();
        Task<TransacaoDTO> GetByIdAsync(int id);
        Task<TransacaoDTO> CreateAsync(TransacaoCreateDTO dto);
        Task<TransacaoDTO> UpdateAsync(int id, TransacaoUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
