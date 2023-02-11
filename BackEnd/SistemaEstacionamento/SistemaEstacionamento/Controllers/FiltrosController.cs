using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.BLLs;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.Enumerators;
using SistemaEstacionamento.Models;
using System.Collections;

namespace SistemaEstacionamento.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltrosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ClienteBLL _clienteBLL;

        public FiltrosController(AppDbContext context)
        {
            _context = context;
            _clienteBLL = new ClienteBLL(_context);
        }

        [HttpGet("Cores")]
        public Array Cores()
        {
            var lista = Enum.GetValues(typeof(CoresEnum));

            return lista;
        }

        [HttpGet("Pagamento")]
        public Array Pagamento()
        {
            var lista = Enum.GetValues(typeof(TipoPagamentoEnum));

            return lista;
        }

        [HttpGet("Cidades")]
        public async Task<IEnumerable> Cidades()
        {
            var lista = await _context.Endereco.Select(p => new { p.Cidade }).ToListAsync();

            return lista;
        }
    }
}
