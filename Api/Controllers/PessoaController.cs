using Microsoft.AspNetCore.Mvc;
using ProjetoFinanceiro2025.Application.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Services;

namespace ProjetoFinanceiro2025.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _service;

        public PessoaController(IPessoaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pessoas = await _service.GetAllAsync();
            return Ok(pessoas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pessoa = await _service.GetByIdAsync(id);
            return Ok(pessoa);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PessoaCreateDTO dto)
        {
            var pessoa = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PessoaUpdateDTO dto)
        {
            var pessoa = await _service.UpdateAsync(id, dto);
            return Ok(pessoa);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
