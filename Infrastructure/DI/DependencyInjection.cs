using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProjetoFinanceiro2025.Application.Interfaces;
using ProjetoFinanceiro2025.Application.Services;
using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Infrastructure.Repositories;
using ProjetoFinanceiro2025.Infrastructure.context;

namespace ProjetoFinanceiro2025.Infrastructure.DI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services, string connectionString)
        {
            // DbContext
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(connectionString));

            // Repositories
            services.AddScoped<IRepository<Categoria>, CategoriaRepository>();
            services.AddScoped<IRepository<Pessoa>, PessoaRepository>();
            services.AddScoped<IRepository<Transacao>, TransacaoRepository>();

            // Services
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<IPessoaService, PessoaService>();
            services.AddScoped<ITransacaoService, TransacaoService>();

            return services;
        }
    }
}
