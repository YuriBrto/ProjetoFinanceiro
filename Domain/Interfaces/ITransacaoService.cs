using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.Application.Interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<TransacaoResponseDTO>> GetAllAsync();
        Task<TransacaoResponseDTO?> GetByIdAsync(int id);
        Task<TransacaoResponseDTO> CreateAsync(TransacaoCreateDTO dto);
        Task<TransacaoResponseDTO?> UpdateAsync(int id ,TransacaoUpdateDTO dto);
        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<TransacaoRecenteDTO>> GetRecentesAsync(int quantidade);
    }
}
