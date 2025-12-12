using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Infrastructure.context;

namespace ProjetoFinanceiro2025.Infrastructure.Repositories
{
    public class PessoaRepository : Repository<Pessoa>, IRepository<Pessoa>
    {
        public PessoaRepository(AppDbContext context) : base(context)
        {
        }
    }
}
