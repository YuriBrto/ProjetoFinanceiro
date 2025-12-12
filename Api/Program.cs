using Microsoft.EntityFrameworkCore;
using ProjetoFinanceiro2025.Infrastructure.DI;
using ProjetoFinanceiro2025.Infrastructure.context;

var builder = WebApplication.CreateBuilder(args);

// Pegar a connection string do appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Configurar SQLite e DbContext usando DI
builder.Services.AddProjectServices(connectionString);

// Adicionar controllers
builder.Services.AddControllers();

// Configurar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurar Swagger apenas em Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Projeto Financeiro API v1");
        c.RoutePrefix = string.Empty; // Swagger na raiz http://localhost:5000
    });
}

// Redirecionar HTTP para HTTPS
app.UseHttpsRedirection();

// Autorização (você pode configurar autenticação depois, se precisar)
app.UseAuthorization();

// Mapear endpoints dos controllers
app.MapControllers();

app.Run();
