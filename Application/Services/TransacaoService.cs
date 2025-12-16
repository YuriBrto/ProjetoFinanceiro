using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using ProjetoFinanceiro2025.Infrastructure.context;
using ProjetoFinanceiro2025.Domain.Enums;

namespace ProjetoFinanceiro2025.Application.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly IRepository<Transacao> _transacaoRepo;
        private readonly IRepository<Categoria> _categoriaRepo;
        private readonly IRepository<Pessoa> _pessoaRepo;
        private readonly ILogger<TransacaoService> _logger;
        private readonly AppDbContext _context;

        public TransacaoService(
            IRepository<Transacao> transacaoRepo,
            IRepository<Categoria> categoriaRepo,
            IRepository<Pessoa> pessoaRepo,
            ILogger<TransacaoService> logger,
            AppDbContext context)
        {
            _transacaoRepo = transacaoRepo;
            _categoriaRepo = categoriaRepo;
            _pessoaRepo = pessoaRepo;
            _logger = logger;
            _context = context;
        }

        public async Task<TransacaoResponseDTO> CreateAsync(TransacaoCreateDTO dto)
        {

            var categoria = await _context.Categorias
    .FirstOrDefaultAsync(c => c.Id == dto.CategoriaId);

            if (categoria == null)
            {
                throw new ArgumentException("Categoria não encontrada");
            }

            try
            {
                // ✅ Validações de negócio
                ValidarValor(dto.Valor);
                await ValidarRelacionamentos(dto.CategoriaId, dto.PessoaId);

                var transacao = new Transacao
                {
                    Valor = dto.Valor,
                    CategoriaId = dto.CategoriaId,
                    PessoaId = dto.PessoaId,

                      Tipo = categoria.Finalidade == FinalidadeCategoria.Receita
                ? TipoTransacao.Receita
                : TipoTransacao.Despesa
                };

                await _transacaoRepo.AddAsync(transacao);
                await _transacaoRepo.SaveChangesAsync();

                _logger.LogInformation(
                    "Transação criada com sucesso. ID: {TransacaoId}, Valor: {Valor}, CategoriaId: {CategoriaId}, PessoaId: {PessoaId}",
                    transacao.Id, transacao.Valor, transacao.CategoriaId, transacao.PessoaId);

                return new TransacaoResponseDTO
                {
                    Id = transacao.Id,
                    Valor = transacao.Valor,
                    CategoriaId = transacao.CategoriaId,
                    PessoaId = transacao.PessoaId
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar transação");
                throw new Exception("Erro ao criar transação", ex);
            }
        }

        public async Task<TransacaoResponseDTO?> GetByIdAsync(int id)
        {
            try
            {
                ValidarId(id);

                var transacao = await _transacaoRepo.GetByIdAsync(id);
                if (transacao == null)
                {
                    _logger.LogWarning("Transação não encontrada. ID: {TransacaoId}", id);
                    return null;
                }

                return new TransacaoResponseDTO
                {
                    Id = transacao.Id,
                    Valor = transacao.Valor,
                    CategoriaId = transacao.CategoriaId,
                    PessoaId = transacao.PessoaId
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar transação {TransacaoId}", id);
                throw new Exception($"Erro ao buscar transação {id}", ex);
            }
        }

        public async Task<IEnumerable<TransacaoResponseDTO>> GetAllAsync()
        {
            try
            {
                var transacoes = await _transacaoRepo.GetAllAsync();

                return transacoes.Select(t => new TransacaoResponseDTO
                {
                    Id = t.Id,
                    Valor = t.Valor,
                    CategoriaId = t.CategoriaId,
                    PessoaId = t.PessoaId
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar todas as transações");
                throw new Exception("Erro ao buscar transações", ex);
            }
        }

        public async Task<TransacaoResponseDTO?> UpdateAsync(int id, TransacaoUpdateDTO dto)
        {
            try
            {
                ValidarId(id);
                ValidarValor(dto.Valor);
                await ValidarRelacionamentos(dto.CategoriaId, dto.PessoaId);

                var transacao = await _transacaoRepo.GetByIdAsync(id);
                if (transacao == null)
                {
                    _logger.LogWarning("Transação não encontrada para atualização. ID: {TransacaoId}", id);
                    return null;
                }

                transacao.Valor = dto.Valor;
                transacao.CategoriaId = dto.CategoriaId;
                transacao.PessoaId = dto.PessoaId;

                await _transacaoRepo.UpdateAsync(transacao);
                await _transacaoRepo.SaveChangesAsync();

                _logger.LogInformation("Transação atualizada com sucesso. ID: {TransacaoId}", id);

                return new TransacaoResponseDTO
                {
                    Id = transacao.Id,
                    Valor = transacao.Valor,
                    CategoriaId = transacao.CategoriaId,
                    PessoaId = transacao.PessoaId
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar transação {TransacaoId}", id);
                throw new Exception($"Erro ao atualizar transação {id}", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                ValidarId(id);

                var transacao = await _transacaoRepo.GetByIdAsync(id);
                if (transacao == null)
                {
                    _logger.LogWarning("Transação não encontrada para exclusão. ID: {TransacaoId}", id);
                    return false;
                }

                await _transacaoRepo.DeleteAsync(transacao);
                await _transacaoRepo.SaveChangesAsync();

                _logger.LogInformation("Transação deletada com sucesso. ID: {TransacaoId}", id);

                return true;
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao deletar transação {TransacaoId}", id);
                throw new Exception($"Erro ao deletar transação {id}", ex);
            }
        }


        //Relatorio

        public async Task<IEnumerable<TransacaoRecenteDTO>> GetRecentesAsync(int quantidade)
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
               .OrderByDescending(t => t.Id)

                .Take(quantidade)
                .Select(t => new TransacaoRecenteDTO
                {
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo.ToString(),
                    PessoaNome = t.Pessoa.Nome
                })
                .ToListAsync();
        }




        // ✅ Métodos privados de validação
        private void ValidarValor(decimal valor)
        {
            if (valor <= 0)
                throw new ArgumentException("O valor da transação deve ser maior que zero");

            if (valor > 999999999.99m)
                throw new ArgumentException("O valor da transação excede o limite permitido");
        }

        private async Task ValidarRelacionamentos(int categoriaId, int pessoaId)
        {
            // Validar Categoria
            var categoria = await _categoriaRepo.GetByIdAsync(categoriaId);
            if (categoria == null)
            {
                _logger.LogWarning("Categoria não encontrada. ID: {CategoriaId}", categoriaId);
                throw new ArgumentException($"Categoria com ID {categoriaId} não existe");
            }

            // Validar Pessoa
            var pessoa = await _pessoaRepo.GetByIdAsync(pessoaId);
            if (pessoa == null)
            {
                _logger.LogWarning("Pessoa não encontrada. ID: {PessoaId}", pessoaId);
                throw new ArgumentException($"Pessoa com ID {pessoaId} não existe");
            }
        }

        private void ValidarId(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");
        }
    }
}