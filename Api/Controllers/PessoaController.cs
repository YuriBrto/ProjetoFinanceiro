using Microsoft.AspNetCore.Mvc;
using ProjetoFinanceiro2025.Application.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _service;
        private readonly ILogger<PessoaController> _logger;

        public PessoaController(IPessoaService service, ILogger<PessoaController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var pessoas = await _service.GetAllAsync();
                return Ok(pessoas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar todas as pessoas");
                return StatusCode(500, new { message = "Erro interno ao buscar pessoas" });
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var pessoa = await _service.GetByIdAsync(id);

                if (pessoa == null)
                    return NotFound(new { message = $"Pessoa com ID {id} não encontrada" });

                return Ok(pessoa);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar pessoa {Id}", id);
                return StatusCode(500, new { message = "Erro interno ao buscar pessoa" });
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] PessoaCreateDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var pessoa = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Validação falhou ao criar pessoa");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar pessoa");
                return StatusCode(500, new { message = "Erro interno ao criar pessoa" });
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update(int id, [FromBody] PessoaUpdateDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var pessoa = await _service.UpdateAsync(id, dto);

                if (pessoa == null)
                    return NotFound(new { message = $"Pessoa com ID {id} não encontrada" });

                return Ok(pessoa);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Validação falhou ao atualizar pessoa {Id}", id);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar pessoa {Id}", id);
                return StatusCode(500, new { message = "Erro interno ao atualizar pessoa" });
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var sucesso = await _service.DeleteAsync(id);

                if (!sucesso)
                    return NotFound(new { message = $"Pessoa com ID {id} não encontrada" });

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao deletar pessoa {Id}", id);
                return StatusCode(500, new { message = "Erro interno ao deletar pessoa" });
            }
        }
    }
}