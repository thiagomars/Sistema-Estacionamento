using Microsoft.AspNetCore.Mvc;
using SistemaEstacionamento.BLLs;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;

namespace SistemaEstacionamento.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TotalizadoresController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TotalizadoresBLL _totalizadoresBLL;

        public TotalizadoresController(AppDbContext context)
        {
            _context = context;
            _totalizadoresBLL = new TotalizadoresBLL(_context);
        }

        [HttpGet]
        public async Task<TotalizadoresDTO> Get()
        {
            var valores = await _totalizadoresBLL.Totalizador();

            return valores;
        }

        [HttpGet("GraficoLinha")]
        public async Task<List<GraficoLinhaDTO>> GetGraficoLinha()
        {
            var dados = await _totalizadoresBLL.GraficoLinha();

            return dados;
        }

        [HttpGet("GraficoPizza")]
        public async Task<List<GraficoPizzaDTO>> GetGraficoPizza()
        {
            var dados = await _totalizadoresBLL.GraficoPizza();

            return dados;
        }



        


    }
}
