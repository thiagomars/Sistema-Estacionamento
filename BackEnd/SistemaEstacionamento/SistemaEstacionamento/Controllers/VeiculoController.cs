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
    public class VeiculoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly VeiculoBLL _veiculoBLL;

        public VeiculoController(AppDbContext context)
        {
            _context = context;
            _veiculoBLL = new VeiculoBLL(_context);
        }

        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    var lista = await _veiculoBLL.Listar();

        //    return Ok(lista);
        //}

        [HttpGet("{placa}")]
        public async Task<IActionResult> Get(string placa)
        {
            try
            {
                var veiculoBuscado = await _veiculoBLL.BuscarPlaca(placa);

                if (veiculoBuscado == null)
                    return NotFound("nenhum veículo encontrado.");

                return Ok(veiculoBuscado);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateVeiculoDTO createDTO)
        {
            try
            {
                var novoVeiculo = await _veiculoBLL.CadastrarVeiculo(createDTO);

                return Ok(novoVeiculo);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Listagem")]
        public async Task<List<ListagemVeiculosDTO>> Get(string? placa, string? tipo, string? cliente)
        {
            var lista = await _veiculoBLL.ListarVeiculos(placa, tipo, cliente);

            return lista;
        }

    }
}
