using Microsoft.EntityFrameworkCore;
using ProjetoFinanceiro2025.Infrastructure.DI;
using ProjetoFinanceiro2025.Infrastructure.context;

var builder = WebApplication.CreateBuilder(args);

// ========================================
// CONFIGURAÇÃO DE CORS
// ========================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",  // Create React App
                "http://localhost:5173",  // Vite
                "http://localhost:5174"   // Vite alternativa
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ========================================
// CONFIGURAÇÃO DA CONNECTION STRING
// ========================================
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=financeiro.db";

// ========================================
// INJEÇÃO DE DEPENDÊNCIAS
// ========================================
builder.Services.AddProjectServices(connectionString);

// ========================================
// CONTROLLERS E SWAGGER
// ========================================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Projeto Financeiro API",
        Version = "v1",
        Description = "API para gerenciamento financeiro"
    });
});

var app = builder.Build();

// ========================================
// MIDDLEWARE PIPELINE
// ========================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Projeto Financeiro API v1");
        c.RoutePrefix = string.Empty;
    });
}

// ✅ ATIVAR CORS (IMPORTANTE!)
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

// ========================================
// CRIAR BANCO AUTOMATICAMENTE
// ========================================
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    try
    {
        dbContext.Database.Migrate();
        Console.WriteLine("✅ Banco de dados criado/atualizado!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Erro ao criar banco: {ex.Message}");
    }
}

app.Run();