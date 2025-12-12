using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Interfaces;

namespace ProjetoFinanceiro2025.Application.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly IRepository<Transacao> _transacaoRepo;

        public TransacaoService(IRepository<Transacao> transacaoRepo)
        {
            _transacaoRepo = transacaoRepo;
        }

        public async Task<TransacaoResponseDTO> CreateAsync(TransacaoCreateDTO dto)
        {
            var transacao = new Transacao
            {
                Valor = dto.Valor,
                CategoriaId = dto.CategoriaId,
                PessoaId = dto.PessoaId
            };

            await _transacaoRepo.AddAsync(transacao);
            await _transacaoRepo.SaveChangesAsync();

            return new TransacaoResponseDTO
            {
                Id = transacao.Id,
                Valor = transacao.Valor,
               
                CategoriaId = transacao.CategoriaId,
                PessoaId = transacao.PessoaId
            };
        }

        public async Task<TransacaoResponseDTO?> GetByIdAsync(int id)
        {
            var transacao = await _transacaoRepo.GetByIdAsync(id);
            if (transacao == null) return null;

            return new TransacaoResponseDTO
            {
                Id = transacao.Id,
                Valor = transacao.Valor,
               
                CategoriaId = transacao.CategoriaId,
                PessoaId = transacao.PessoaId
            };
        }

        public async Task<IEnumerable<TransacaoResponseDTO>> GetAllAsync()
        {
            var transacoes = await _transacaoRepo.GetAllAsync();
            return transacoes.Select(t => new TransacaoResponseDTO
            {
                Id = t.Id,
                Valor = t.Valor,
             
                CategoriaId = t.CategoriaId,
                PessoaId = t.PessoaId
            });
        }


        public async Task<TransacaoResponseDTO?> UpdateAsync(int id, TransacaoUpdateDTO dto)
        {
            var transacao = await _transacaoRepo.GetByIdAsync(id);
            if (transacao == null) return null;

            transacao.Valor = dto.Valor;
            transacao.PessoaId = dto.PessoaId;
            transacao.CategoriaId = dto.CategoriaId;

            await _transacaoRepo.UpdateAsync(transacao);
            await _transacaoRepo.SaveChangesAsync();

            return new TransacaoResponseDTO
            {
                Id = transacao.Id,
                Valor = transacao.Valor,
                PessoaId = transacao.PessoaId,
                CategoriaId = transacao.CategoriaId
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var transacao = await _transacaoRepo.GetByIdAsync(id);
            if (transacao == null) return false;

            await _transacaoRepo.DeleteAsync(transacao);
            await _transacaoRepo.SaveChangesAsync();

            return true;
        }
    }
}
