using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProjetoFinanceiro2025.Domain.Entities;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Infrastructure.Repositories;
using ProjetoFinanceiro2025.Application.Services;
using ProjetoFinanceiro2025.Infrastructure.context;

namespace ProjetoFinanceiro2025.Infrastructure.DI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services, string connectionString)
        {
            // Configurar DbContext com SQLite
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(connectionString));

            // Repositories (registrando as interfaces genéricas)
            services.AddScoped<IRepository<Categoria>, CategoriaRepository>();
            services.AddScoped<IRepository<Pessoa>, PessoaRepository>();
            services.AddScoped<IRepository<Transacao>, TransacaoRepository>();

            // Services (registrando apenas as classes concretas)
            services.AddScoped<CategoriaService>();
            services.AddScoped<PessoaService>();
            services.AddScoped<TransacaoService>();

            return services;
        }
    }
}
