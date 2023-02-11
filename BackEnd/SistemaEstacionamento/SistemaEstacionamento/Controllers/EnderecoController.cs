using Microsoft.AspNetCore.Mvc;
using SistemaEstacionamento.BLLs;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EnderecoBLL _enderecoBLL; 

        public EnderecoController(AppDbContext context)
        {
            _context = context;
            _enderecoBLL = new EnderecoBLL(_context);
        }

        [HttpGet("{cep}")]
        public async Task<IActionResult> Get(int cep)
        {
            var listaCep = await _enderecoBLL.BuscarPorCep(cep);

            return Ok(listaCep);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateEnderecoDTO createDTO)
        {
            try
            {
                var novoEndereco = await _enderecoBLL.CadastrarEndereco(createDTO);

                return Ok(novoEndereco);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Listagem")]
        public async Task<List<ListagemEnderecoDTO>> Get(int? cep, string? uf, string? cidade, string? bairro)
        {
            var lista = await _enderecoBLL.ListagemEndereco(cep, uf, cidade, bairro);

            return lista;
        }
    }
}
