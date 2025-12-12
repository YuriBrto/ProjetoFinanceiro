using ProjetoFinanceiro2025.Domain.Entities;
using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;

namespace ProjetoFinanceiro2025.Infrastructure.context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Pessoa
            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.ToTable("Pessoas");
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Nome)
                      .IsRequired()
                      .HasMaxLength(150);
            });

            // Categoria
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.ToTable("Categorias");
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Descricao)
                      .IsRequired()
                      .HasMaxLength(150);
            });

            // Transacao
            modelBuilder.Entity<Transacao>(entity =>
            {
                entity.ToTable("Transacoes");
                entity.HasKey(t => t.Id);

                entity.Property(t => t.Descricao)
                      .HasMaxLength(255);

                entity.Property(t => t.Valor)
                      .IsRequired();

              
                // Pessoa 1-N
                entity.HasOne(t => t.Pessoa)
                      .WithMany(p => p.Transacoes)
                      .HasForeignKey(t => t.PessoaId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Categoria N-1
                entity.HasOne(t => t.Categoria)
                      .WithMany(c => c.Transacoes)
                      .HasForeignKey(t => t.CategoriaId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
