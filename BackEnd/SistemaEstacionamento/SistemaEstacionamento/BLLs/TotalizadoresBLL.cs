using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Enumerators;
using System.Globalization;

namespace SistemaEstacionamento.BLLs
{
    public class TotalizadoresBLL
    {
        private readonly AppDbContext _context;

        public TotalizadoresBLL(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TotalizadoresDTO> Totalizador()
        {
            TotalizadoresDTO dto = new TotalizadoresDTO();
            
            var oculpado = await _context.Registro.Where(aux => aux.Finalizado == false).CountAsync();
            dto.Oculpado = oculpado;

            var entrada = await _context.Registro.Where(entradas => entradas.Entrada.Day == DateTime.UtcNow.Day).CountAsync();
            var saida = await _context.Registro.Where(saidas => saidas.Saida != null && saidas.Saida.Value.Day == DateTime.UtcNow.Day).CountAsync();
            dto.EntradaSaida = entrada.ToString() + "/" + saida.ToString();

            var cliente = await _context.Cliente.CountAsync();
            dto.Clientes = cliente;

            var veiculo = await _context.Veiculo.CountAsync();
            dto.Veiculos = veiculo;

            return dto;
        }

        public async Task<List<GraficoLinhaDTO>> GraficoLinha()
        {
            List<GraficoLinhaDTO> lista = new List<GraficoLinhaDTO>();

            var hoje = DateTime.UtcNow;

            for(int cont = 0; cont < 7; cont++)
            {
                var grafico = new GraficoLinhaDTO();
                grafico.DiaSemana = hoje.AddDays(-cont);

                grafico.Quantidade = await _context.Registro
                    .Where(item => item.Entrada.Day == hoje.AddDays(-cont).Day)
                    .CountAsync();

                lista.Add(grafico);
            }

            return lista;
        }

        public async Task<List<GraficoPizzaDTO>> GraficoPizza()
        {
            List<GraficoPizzaDTO> lista = new List<GraficoPizzaDTO>();

            foreach(var cont in Enum.GetValues(typeof(TipoVeiculoEnum)))
            {
                var grafico = new GraficoPizzaDTO();
                grafico.TipoVeiculo = (TipoVeiculoEnum)cont;

                grafico.Quantidade = await _context.Veiculo
                    .Where(item => item.Tipo == (TipoVeiculoEnum)cont)
                    .CountAsync();

                lista.Add(grafico);
            }

            return lista;
        }
    }
}
