using Microsoft.AspNetCore.Mvc;
using ProjetoFinanceiro2025.Domain.Interfaces;


[ApiController]
[Route("api/relatorios")]
public class RelatorioController : ControllerBase
{
    private readonly IRelatorioService _service;

    public RelatorioController(IRelatorioService service)
    {
        _service = service;
    }

    [HttpGet("saldo-geral")]
    public async Task<IActionResult> GetSaldoGeral()
    {
        var saldo = await _service.ObterSaldoGeralAsync();
        return Ok(new { saldoTotal = saldo });
    }

    [HttpGet("pessoas")]
    public async Task<IActionResult> GetTotaisPorPessoa()
    {
        return Ok(await _service.ObterTotaisPorPessoaAsync());
    }

    [HttpGet("categorias")]
    public async Task<IActionResult> GetTotaisPorCategoria()
    {
        return Ok(await _service.ObterTotaisPorCategoriaAsync());
    }
}
