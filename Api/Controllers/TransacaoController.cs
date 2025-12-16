using Microsoft.AspNetCore.Mvc;
using ProjetoFinanceiro2025.Application.Interfaces;
using ProjetoFinanceiro2025.Application.DTOs;

namespace ProjetoFinanceiro2025.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _service;
        private readonly ILogger<TransacaoController> _logger;

        public TransacaoController(ITransacaoService service, ILogger<TransacaoController> logger)
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
                var transacoes = await _service.GetAllAsync();
                return Ok(transacoes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar todas as transações");
                return StatusCode(500, new { message = "Erro interno ao buscar transações" });
            }
        }


        /// Retorna uma transação por ID
     
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var transacao = await _service.GetByIdAsync(id);

                if (transacao == null)
                    return NotFound(new { message = $"Transação com ID {id} não encontrada" });

                return Ok(transacao);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar transação {Id}", id);
                return StatusCode(500, new { message = "Erro interno ao buscar transação" });
            }
        }

        /// <summary>
        /// Cria uma nova transação
        /// </summary>
        /// <remarks>
        /// Exemplo de requisição:
        /// 
        ///     POST /api/transacao
        ///     {
        ///        "valor": 150.00,
        ///        "categoriaId": 1,
        ///        "pessoaId": 1
        ///     }
        /// 
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] TransacaoCreateDTO dto)
        {
            try
            {
               
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var transacao = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = transacao.Id }, transacao);
            }
            catch (ArgumentException ex)
            {
               
                _logger.LogWarning(ex, "Validação falhou ao criar transação");
                return BadRequest(new
                {
                    message = ex.Message,
                    errors = new[] { ex.Message }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar transação");
                return StatusCode(500, new { message = "Erro interno ao criar transação" });
            }
        }

        /// <summary>
        /// Atualiza uma transação existente
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update(int id, [FromBody] TransacaoUpdateDTO dto)
        {
            try
            {
               
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var transacao = await _service.UpdateAsync(id, dto);

               
                if (transacao == null)
                    return NotFound(new { message = $"Transação com ID {id} não encontrada" });

                return Ok(transacao);
            }
            catch (ArgumentException ex)
            {
               
                _logger.LogWarning(ex, "Validação falhou ao atualizar transação {Id}", id);
                return BadRequest(new
                {
                    message = ex.Message,
                    errors = new[] { ex.Message }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar transação {Id}", id);
                return StatusCode(500, new { message = "Erro interno ao atualizar transação" });
            }
        }
        //Transacoes recentes para relatorio
        [HttpGet("recentes")]
        public async Task<IActionResult> GetRecentes()
        {
            var transacoes = await _service.GetRecentesAsync(5);
            return Ok(transacoes);
        }

        /// Deleta uma transação

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // ✅ Verifica o retorno bool
                var sucesso = await _service.DeleteAsync(id);

                if (!sucesso)
                    return NotFound(new { message = $"Transação com ID {id} não encontrada" });

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao deletar transação {Id}", id);
                return StatusCode(500, new { message = "Erro interno ao deletar transação" });
            }
        }
    }
}