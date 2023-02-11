using Microsoft.AspNetCore.Mvc;
using SistemaEstacionamento.BLLs;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ClienteBLL _clienteBLL;

        public ClienteController(AppDbContext context)
        {
            _context = context;
            _clienteBLL = new ClienteBLL(_context);
        }

        [HttpGet("{cpf}")]
        public async Task<IActionResult> Get(long cpf)
        {
            try
            {
                var clienteBuscado = await _clienteBLL.BuscarPorCpf(cpf);
                
                return Ok(clienteBuscado);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateClienteDTO createDTO)
        {
            try
            {
                var clienteCadastrado = await _clienteBLL.CadastrarCliente(createDTO);

                return Ok(clienteCadastrado);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("Listagem")]
        public async Task<List<ListagemClientesDTO>> Get(string? nome, int? cpf, string? estado)
        {
            
            var listagem = await _clienteBLL.ListarClientes(nome, cpf, estado);

            return listagem;
        }
    }
}
