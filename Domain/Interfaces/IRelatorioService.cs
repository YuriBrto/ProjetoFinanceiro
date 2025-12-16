using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.Domain.Interfaces
{
    public interface IRelatorioService
    {
        Task<decimal> ObterSaldoGeralAsync();
        Task<IEnumerable<TotalPessoaDTO>> ObterTotaisPorPessoaAsync();
        Task<IEnumerable<TotalCategoriaDTO>> ObterTotaisPorCategoriaAsync();
    }

}
