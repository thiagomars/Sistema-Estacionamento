using Microsoft.AspNetCore.Mvc;
using SistemaEstacionamento.BLLs;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Enumerators;
using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly RegistroBLL _registroBLL;

        public RegistroController(AppDbContext context)
        {
            _context = context;
            _registroBLL = new RegistroBLL(_context);
        }

        [HttpPost]
        public async Task<IActionResult> Post(RegistrarEntradaDTO dto)
        {
            try
            {
                var cadastarEntradaVeiculo = await _registroBLL.RegistrarEntrada(dto);

                return Ok(cadastarEntradaVeiculo);
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        public async Task<List<Registro>> Get(string? placa, CoresEnum? cor)
        {
            var listaRegistros = await _registroBLL.ListarVeiculosEstacionados(placa, cor);

            return listaRegistros;
        }

        [HttpGet("Encerrar")] 
        public async Task<ActionResult<Registro>> Get(int id, Nullable<bool> veiculo, bool cliente = false)
        {
            try
            {
                var dado = await _registroBLL.DadosSaida(id, veiculo, cliente);

                return Ok(dado);
            } catch(Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(FinalizarRegistroDTO registroDTO)
        {
            try
            {
                await _registroBLL.EncerrarRegistro(registroDTO);

                return Ok();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Listagem")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var lista = await _registroBLL.ListarTodosRegistros();
                
                return Ok(lista);
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        

    }
}
