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
        public async Task<List<HomeGraficoLinhaDTO>> GetGraficoLinha()
        {
            var dados = await _totalizadoresBLL.GraficoLinha();

            return dados;
        }

        [HttpGet("GraficoPizza")]
        public async Task<List<HomeGraficoPizzaDTO>> GetGraficoPizza()
        {
            var dados = await _totalizadoresBLL.GraficoPizza();

            return dados;
        }

        [HttpGet("FinanceiroBarras")]
        public async Task<List<FinanceiroGraficoBarrasDTO>> GetFinanceiroBarras([FromQuery] DateTime inicial, [FromQuery] DateTime final)
        {
            var dados = await _totalizadoresBLL.GraficoBarrasFinanceiro(inicial, final);

            return dados;
        }

        [HttpGet("FinanceiroTotalizadores")]
        public async Task<List<TotalizadorGenericoDTO>> GetFinanceiroTotalizadores()
        {
            List<TotalizadorGenericoDTO> lista = new List<TotalizadorGenericoDTO>();

            var totalizadorSemanal = await _totalizadoresBLL.TotalSemanaFinanceiro();
            var totalizadorDiario = await _totalizadoresBLL.TotalDiaFinanceiro();
            var totalizadorMensal = await _totalizadoresBLL.TotalMesFinanceiro();

            lista.Add(totalizadorMensal);
            lista.Add(totalizadorSemanal);
            lista.Add(totalizadorDiario);

            return lista;

        }




    }
}
