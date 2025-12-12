using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Infrastructure.context;

namespace ProjetoFinanceiro2025.Infrastructure.Repositories
{
    public class TransacaoRepository : Repository<Transacao>, IRepository<Transacao>
    {
        public TransacaoRepository(AppDbContext context) : base(context)
        {
        }
    }
}
