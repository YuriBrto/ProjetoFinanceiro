using Microsoft.AspNetCore.Mvc;
using ProjetoFinanceiro2025.Application.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Services;

namespace ProjetoFinanceiro2025.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _service;

        public TransacaoController(ITransacaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transacoes = await _service.GetAllAsync();
            return Ok(transacoes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var transacao = await _service.GetByIdAsync(id);
            return Ok(transacao);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TransacaoCreateDTO dto)
        {
            var transacao = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = transacao.Id }, transacao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TransacaoUpdateDTO dto)
        {
            var transacao = await _service.UpdateAsync(id, dto);
            return Ok(transacao);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
