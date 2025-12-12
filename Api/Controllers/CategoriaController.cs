using Microsoft.AspNetCore.Mvc;
using ProjetoFinanceiro2025.Application.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;
using ProjetoFinanceiro2025.Application.Services;

namespace ProjetoFinanceiro2025.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _service;

        public CategoriaController(ICategoriaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categorias = await _service.GetAllAsync();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var categoria = await _service.GetByIdAsync(id);
            return Ok(categoria);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoriaCreateDTO dto)
        {
            var categoria = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CategoriaUpdateDTO dto)
        {
            var categoria = await _service.UpdateAsync(id, dto);
            return Ok(categoria);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
