using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;


namespace ProjetoFinanceiro2025.Application.Services
{
    public class TransacaoService
    {
        private readonly IRepository<Transacao> _transacaoRepo;
        private readonly IRepository<Pessoa> _pessoaRepo;
        private readonly IRepository<Categoria> _categoriaRepo;

        public TransacaoService(
            IRepository<Transacao> transacaoRepo,
            IRepository<Pessoa> pessoaRepo,
            IRepository<Categoria> categoriaRepo)
        {
            _transacaoRepo = transacaoRepo;
            _pessoaRepo = pessoaRepo;
            _categoriaRepo = categoriaRepo;
        }

        public async Task<TransacaoResponseDTO> CreateAsync(TransacaoCreateDTO dto)
        {
            var pessoa = await _pessoaRepo.GetByIdAsync(dto.PessoaId)
                         ?? throw new Exception("Pessoa não encontrada");

            var categoria = await _categoriaRepo.GetByIdAsync(dto.CategoriaId)
                           ?? throw new Exception("Categoria não encontrada");

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId
            };

            await _transacaoRepo.AddAsync(transacao);
            await _transacaoRepo.SaveChangesAsync();

            return new TransacaoResponseDTO
            {
                Id = transacao.Id,
                Descricao = transacao.Descricao,
                Valor = transacao.Valor,
                Tipo = transacao.Tipo.ToString(),
                PessoaId = pessoa.Id,
                PessoaNome = pessoa.Nome,
                CategoriaId = categoria.Id,
                CategoriaDescricao = categoria.Descricao
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var transacao = await _transacaoRepo.GetByIdAsync(id);
            if (transacao == null) return false;

            _transacaoRepo.DeleteAsync(transacao);
            await _transacaoRepo.SaveChangesAsync();

            return true;
        }
    }
}
