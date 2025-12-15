using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace ProjetoFinanceiro2025.Application.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly IRepository<Categoria> _categoriaRepo;
        private readonly ILogger<CategoriaService> _logger;

        public CategoriaService(
            IRepository<Categoria> categoriaRepo,
            ILogger<CategoriaService> logger)
        {
            _categoriaRepo = categoriaRepo;
            _logger = logger;
        }

        public async Task<CategoriaResponseDTO> CreateAsync(CategoriaCreateDTO dto)
        {
            try
            {
                // ✅ Validações de negócio
                ValidarCategoria(dto.Descricao);

                var categoria = new Categoria
                {
                    Descricao = dto.Descricao.Trim(),
                    Finalidade = dto.Finalidade
                };

                await _categoriaRepo.AddAsync(categoria);
                await _categoriaRepo.SaveChangesAsync();

                _logger.LogInformation("Categoria criada com sucesso. ID: {CategoriaId}", categoria.Id);

                return new CategoriaResponseDTO
                {
                    Id = categoria.Id,
                    Descricao = categoria.Descricao,
                    Finalidade = categoria.Finalidade.ToString()
                };
            }
            catch (ArgumentException)
            {
                throw; // Repropaga exceções de validação
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar categoria");
                throw new Exception("Erro ao criar categoria", ex);
            }
        }

        public async Task<CategoriaResponseDTO?> GetByIdAsync(int id)
        {
            try
            {
                ValidarId(id);

                var categoria = await _categoriaRepo.GetByIdAsync(id);
                if (categoria == null)
                {
                    _logger.LogWarning("Categoria não encontrada. ID: {CategoriaId}", id);
                    return null;
                }

                return new CategoriaResponseDTO
                {
                    Id = categoria.Id,
                    Descricao = categoria.Descricao,
                    Finalidade = categoria.Finalidade.ToString()
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar categoria {CategoriaId}", id);
                throw new Exception($"Erro ao buscar categoria {id}", ex);
            }
        }

        public async Task<IEnumerable<CategoriaResponseDTO>> GetAllAsync()
        {
            try
            {
                var categorias = await _categoriaRepo.GetAllAsync();

                return categorias.Select(c => new CategoriaResponseDTO
                {
                    Id = c.Id,
                    Descricao = c.Descricao,
                    Finalidade = c.Finalidade.ToString()
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar todas as categorias");
                throw new Exception("Erro ao buscar categorias", ex);
            }
        }

        public async Task<CategoriaResponseDTO?> UpdateAsync(int id, CategoriaUpdateDTO dto)
        {
            try
            {
                ValidarId(id);
                ValidarCategoria(dto.Descricao);

                var categoria = await _categoriaRepo.GetByIdAsync(id);
                if (categoria == null)
                {
                    _logger.LogWarning("Categoria não encontrada para atualização. ID: {CategoriaId}", id);
                    return null;
                }

                categoria.Descricao = dto.Descricao.Trim();
                categoria.Finalidade = dto.Finalidade;

                await _categoriaRepo.UpdateAsync(categoria);
                await _categoriaRepo.SaveChangesAsync();

                _logger.LogInformation("Categoria atualizada com sucesso. ID: {CategoriaId}", id);

                return new CategoriaResponseDTO
                {
                    Id = categoria.Id,
                    Descricao = categoria.Descricao,
                    Finalidade = categoria.Finalidade.ToString()
                };
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar categoria {CategoriaId}", id);
                throw new Exception($"Erro ao atualizar categoria {id}", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                ValidarId(id);

                var categoria = await _categoriaRepo.GetByIdAsync(id);
                if (categoria == null)
                {
                    _logger.LogWarning("Categoria não encontrada para exclusão. ID: {CategoriaId}", id);
                    return false;
                }

                await _categoriaRepo.DeleteAsync(categoria);
                await _categoriaRepo.SaveChangesAsync();

                _logger.LogInformation("Categoria deletada com sucesso. ID: {CategoriaId}", id);

                return true;
            }
            catch (ArgumentException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao deletar categoria {CategoriaId}", id);
                throw new Exception($"Erro ao deletar categoria {id}", ex);
            }
        }

        // ✅ Métodos privados de validação
        private void ValidarCategoria(string descricao)
        {
            if (string.IsNullOrWhiteSpace(descricao))
                throw new ArgumentException("A descrição da categoria não pode ser vazia");

            if (descricao.Length < 3)
                throw new ArgumentException("A descrição da categoria deve ter no mínimo 3 caracteres");

            if (descricao.Length > 200)
                throw new ArgumentException("A descrição da categoria deve ter no máximo 200 caracteres");
        }

        private void ValidarId(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");
        }
    }
}