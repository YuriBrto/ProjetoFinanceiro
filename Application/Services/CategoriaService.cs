using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;


namespace ProjetoFinanceiro2025.Application.Services
{
    public class CategoriaService
    {
        private readonly IRepository<Categoria> _categoriaRepo;

        public CategoriaService(IRepository<Categoria> categoriaRepo)
        {
            _categoriaRepo = categoriaRepo;
        }

        public async Task<CategoriaResponseDTO> CreateAsync(CategoriaCreateDTO dto)
        {
            var categoria = new Categoria
            {
                Descricao = dto.Descricao,
                Finalidade = dto.Finalidade
            };

            await _categoriaRepo.AddAsync(categoria);
            await _categoriaRepo.SaveChangesAsync();

            return new CategoriaResponseDTO
            {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade.ToString()
            };
        }

        public async Task<CategoriaResponseDTO?> GetByIdAsync(int id)
        {
            var categoria = await _categoriaRepo.GetByIdAsync(id);
            if (categoria == null) return null;

            return new CategoriaResponseDTO
            {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade.ToString()
            };
        }

        public async Task<IEnumerable<CategoriaResponseDTO>> GetAllAsync()
        {
            var categorias = await _categoriaRepo.GetAllAsync();

            return categorias.Select(c => new CategoriaResponseDTO
            {
                Id = c.Id,
                Descricao = c.Descricao,
                Finalidade = c.Finalidade.ToString()
            });
        }

        public async Task<bool> UpdateAsync(CategoriaUpdateDTO dto)
        {
            var categoria = await _categoriaRepo.GetByIdAsync(dto.Id);
            if (categoria == null) return false;

            categoria.Descricao = dto.Descricao;
            categoria.Finalidade = dto.Finalidade;

            _categoriaRepo.UpdateAsync(categoria);
            await _categoriaRepo.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var categoria = await _categoriaRepo.GetByIdAsync(id);
            if (categoria == null) return false;

            _categoriaRepo.DeleteAsync(categoria);
            await _categoriaRepo.SaveChangesAsync();

            return true;
        }
    }
}
