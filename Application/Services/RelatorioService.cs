using Microsoft.EntityFrameworkCore;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Interfaces;
using ProjetoFinanceiro2025.Domain.Enums;
using ProjetoFinanceiro2025.Domain.Interfaces;
using ProjetoFinanceiro2025.Infrastructure.context;


namespace ProjetoFinanceiro2025.Application.Services
{
    public class RelatorioService : IRelatorioService
    {
        private readonly AppDbContext _context;

        public RelatorioService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Saldo Geral = Total de Receitas - Total de Despesas
        /// </summary>
        public async Task<decimal> ObterSaldoGeralAsync()
        {
            var receitas = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .SumAsync(t => t.Valor);

            var despesas = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .SumAsync(t => t.Valor);

            return receitas - despesas;
        }

        /// <summary>
        /// Totais agrupados por Pessoa
        /// </summary>
        public async Task<IEnumerable<TotalPessoaDTO>> ObterTotaisPorPessoaAsync()
        {
            var dados = await _context.Transacoes
                .Include(t => t.Pessoa)
                .GroupBy(t => t.Pessoa.Nome)
                .Select(g => new TotalPessoaDTO
                {
                    Nome = g.Key,
                    TotalReceita = g
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor),

                    TotalDespesa = g
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor),

                    Saldo = g
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor)
                        -
                        g
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor)
                })
                .ToListAsync(); // 👈 EXECUTA NO BANCO

            // 👇 Agora ordena em memória (LINQ to Objects)
            return dados
                .OrderByDescending(p => p.Saldo)
                .ToList();
        }

        /// <summary>
        /// Totais agrupados por Categoria
        /// </summary>
        public async Task<IEnumerable<TotalCategoriaDTO>> ObterTotaisPorCategoriaAsync()
        {
            var dados = await _context.Transacoes
                .Include(t => t.Categoria)
                .GroupBy(t => t.Categoria.Descricao)
                .Select(g => new TotalCategoriaDTO
                {
                    Categoria = g.Key,
                    Total = g.Sum(t =>
                        t.Tipo == TipoTransacao.Receita ? t.Valor : -t.Valor
                    )
                })
                .ToListAsync(); // 👈 EXECUTA NO BANCO

            return dados
                .OrderByDescending(c => c.Total)
                .ToList();
        }

    }
}
