using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace ProjetoFinanceiro2025.Application.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IRepository<Pessoa> _pessoaRepo;
        private readonly ILogger<PessoaService> _logger;

        public PessoaService(
            IRepository<Pessoa> pessoaRepo,
            ILogger<PessoaService> logger)
        {
            _pessoaRepo = pessoaRepo;
            _logger = logger;
        }

        public async Task<PessoaResponseDTO> CreateAsync(PessoaCreateDTO dto)
        {
            try
            {
                // ✅ Validações de negócio
                ValidarPessoa(dto.Nome, dto.Idade);

                var pessoa = new Pessoa
                {
                    Nome = dto.Nome.Trim(),
                    Idade = dto.Idade
                };

                await _pessoaRepo.AddAsync(pessoa);
                await _pessoaRepo.SaveChangesAsync();

                _logger.LogInformation("Pessoa criada com sucesso. ID: {PessoaId}", pessoa.Id);

                return new PessoaResponseDTO
                {
                    Id = pessoa.Id,
                    Nome = pessoa.Nome,
                    Idade = pessoa.Idade
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar pessoa");
                throw new Exception("Erro ao criar pessoa", ex);
            }
        }

        public async Task<PessoaResponseDTO?> GetByIdAsync(int id)
        {
            try
            {
                ValidarId(id);

                var pessoa = await _pessoaRepo.GetByIdAsync(id);
                if (pessoa == null)
                {
                    _logger.LogWarning("Pessoa não encontrada. ID: {PessoaId}", id);
                    return null;
                }

                return new PessoaResponseDTO
                {
                    Id = pessoa.Id,
                    Nome = pessoa.Nome,
                    Idade = pessoa.Idade
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar pessoa {PessoaId}", id);
                throw new Exception($"Erro ao buscar pessoa {id}", ex);
            }
        }

        public async Task<IEnumerable<PessoaResponseDTO>> GetAllAsync()
        {
            try
            {
                var pessoas = await _pessoaRepo.GetAllAsync();

                return pessoas.Select(p => new PessoaResponseDTO
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Idade = p.Idade
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar todas as pessoas");
                throw new Exception("Erro ao buscar pessoas", ex);
            }
        }

        public async Task<PessoaResponseDTO?> UpdateAsync(int id, PessoaUpdateDTO dto)
        {
            try
            {
                ValidarId(id);
                ValidarPessoa(dto.Nome, dto.Idade);

                var pessoa = await _pessoaRepo.GetByIdAsync(id);
                if (pessoa == null)
                {
                    _logger.LogWarning("Pessoa não encontrada para atualização. ID: {PessoaId}", id);
                    return null;
                }

                pessoa.Nome = dto.Nome.Trim();
                pessoa.Idade = dto.Idade;

                await _pessoaRepo.UpdateAsync(pessoa);
                await _pessoaRepo.SaveChangesAsync();

                _logger.LogInformation("Pessoa atualizada com sucesso. ID: {PessoaId}", id);

                return new PessoaResponseDTO
                {
                    Id = pessoa.Id,
                    Nome = pessoa.Nome,
                    Idade = pessoa.Idade
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar pessoa {PessoaId}", id);
                throw new Exception($"Erro ao atualizar pessoa {id}", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                ValidarId(id);

                var pessoa = await _pessoaRepo.GetByIdAsync(id);
                if (pessoa == null)
                {
                    _logger.LogWarning("Pessoa não encontrada para exclusão. ID: {PessoaId}", id);
                    return false;
                }

                await _pessoaRepo.DeleteAsync(pessoa);
                await _pessoaRepo.SaveChangesAsync();

                _logger.LogInformation("Pessoa deletada com sucesso. ID: {PessoaId}", id);

                return true;
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao deletar pessoa {PessoaId}", id);
                throw new Exception($"Erro ao deletar pessoa {id}", ex);
            }
        }

        // ✅ Métodos privados de validação
        private void ValidarPessoa(string nome, int idade)
        {
            if (string.IsNullOrWhiteSpace(nome))
                throw new ArgumentException("O nome da pessoa não pode ser vazio");

            if (nome.Length < 3)
                throw new ArgumentException("O nome da pessoa deve ter no mínimo 3 caracteres");

            if (nome.Length > 200)
                throw new ArgumentException("O nome da pessoa deve ter no máximo 200 caracteres");

            if (idade < 0)
                throw new ArgumentException("A idade não pode ser negativa");

            if (idade > 150)
                throw new ArgumentException("A idade não pode ser maior que 150 anos");
        }

        private void ValidarId(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");
        }
    }
}