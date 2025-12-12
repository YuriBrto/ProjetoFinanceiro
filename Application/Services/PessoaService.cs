using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;


namespace ProjetoFinanceiro2025.Application.Services
{
    public class PessoaService
    {
        private readonly IRepository<Pessoa> _pessoaRepo;

        public PessoaService(IRepository<Pessoa> pessoaRepo)
        {
            _pessoaRepo = pessoaRepo;
        }

        public async Task<PessoaResponseDTO> CreateAsync(PessoaCreateDTO dto)
        {
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            await _pessoaRepo.AddAsync(pessoa);
            await _pessoaRepo.SaveChangesAsync();

            return new PessoaResponseDTO
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };
        }

        public async Task<PessoaResponseDTO?> GetByIdAsync(int id)
        {
            var pessoa = await _pessoaRepo.GetByIdAsync(id);
            if (pessoa == null) return null;

            return new PessoaResponseDTO
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };
        }

        public async Task<IEnumerable<PessoaResponseDTO>> GetAllAsync()
        {
            var pessoas = await _pessoaRepo.GetAllAsync();

            return pessoas.Select(p => new PessoaResponseDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade
            });
        }

        public async Task<bool> UpdateAsync(PessoaUpdateDTO dto)
        {
            var pessoa = await _pessoaRepo.GetByIdAsync(dto.Id);
            if (pessoa == null) return false;

            pessoa.Nome = dto.Nome;
            pessoa.Idade = dto.Idade;

            _pessoaRepo.UpdateAsync(pessoa);
            await _pessoaRepo.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var pessoa = await _pessoaRepo.GetByIdAsync(id);
            if (pessoa == null) return false;

            _pessoaRepo.DeleteAsync(pessoa);
            await _pessoaRepo.SaveChangesAsync();

            return true;
        }
    }
}
