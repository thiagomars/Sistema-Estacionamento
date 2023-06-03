using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Enumerators;
using System.ComponentModel;
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

            var entrada = await _context.Registro
                .Where(entradas => entradas.Entrada.Day == DateTime.UtcNow.Day)
                .CountAsync();

            var saida = await _context.Registro
                .Where(saidas => saidas.Saida != null && saidas.Saida.Value.Day == DateTime.UtcNow.Day)
                .CountAsync();

            dto.EntradaSaida = entrada.ToString() + "/" + saida.ToString();

            var cliente = await _context.Cliente.CountAsync();
            dto.Clientes = cliente;

            var veiculo = await _context.Veiculo.CountAsync();
            dto.Veiculos = veiculo;

            return dto;
        }

        public async Task<List<HomeGraficoLinhaDTO>> GraficoLinha()
        {
            List<HomeGraficoLinhaDTO> lista = new List<HomeGraficoLinhaDTO>();

            var hoje = DateTime.UtcNow;

            for(int cont = 0; cont < 7; cont++)
            {
                var grafico = new HomeGraficoLinhaDTO();
                grafico.DiaSemana = hoje.AddDays(-cont);

                grafico.Quantidade = await _context.Registro
                    .Where(item => item.Entrada.Day == hoje.AddDays(-cont).Day)
                    .CountAsync();

                lista.Add(grafico);
            }

            return lista;
        }

        public async Task<List<HomeGraficoPizzaDTO>> GraficoPizza()
        {
            List<HomeGraficoPizzaDTO> lista = new List<HomeGraficoPizzaDTO>();

            foreach(var cont in Enum.GetValues(typeof(TipoVeiculoEnum)))
            {
                var grafico = new HomeGraficoPizzaDTO();
                grafico.TipoVeiculo = (TipoVeiculoEnum)cont;

                grafico.Quantidade = await _context.Veiculo
                    .Where(item => item.Tipo == (TipoVeiculoEnum)cont)
                    .CountAsync();

                lista.Add(grafico);
            }

            return lista;
        }

        public async Task<List<FinanceiroGraficoBarrasDTO>> GraficoBarrasFinanceiro(DateTime inicial, DateTime final)
        {
            List<FinanceiroGraficoBarrasDTO> lista = new List<FinanceiroGraficoBarrasDTO>();

            var dateAux = final.Subtract(inicial);
            int quantidadeDias = dateAux.Days;

            for(var cont = 0; cont <= quantidadeDias; cont++)
            {
                var item = new FinanceiroGraficoBarrasDTO();
                item.DiaSemana = inicial.AddDays(cont);
                item.Quantidade = await _context.Registro
                    .Include(pagamento => pagamento.Pagamento)
                    .Where(data => data.Saida.Value.Day == item.DiaSemana.Day && data.Saida.Value.Month == item.DiaSemana.Month)
                    .SumAsync(sm => sm.Pagamento.Valor);

                lista.Add(item);
            }

            return lista;
        }

        public async Task<TotalizadorGenericoDTO> TotalSemanaFinanceiro()
        {
            var qtdDias = 1;
            var hoje = DateTime.UtcNow;
            while (! DayOfWeek.Monday.Equals(hoje.AddDays(-qtdDias).DayOfWeek))
            {
                qtdDias++;
            }

            var totalizador = new TotalizadorGenericoDTO();
            totalizador.Titulo = "Total da Semana";
            
            for(var cont = 0; cont <= qtdDias; cont++)
            {
                totalizador.Valor += await _context.Registro
                        .Include(pagamento => pagamento.Pagamento)
                        .Where(item => item.Finalizado == true && item.Saida.Value.Day == DateTime.UtcNow.AddDays(-cont).Day && item.Saida.Value.Month == DateTime.UtcNow.AddDays(-cont).Month)
                        .SumAsync(somar => somar.Pagamento.Valor);
            }

            var semanaPassada = 0.0m;
            for(var cont = qtdDias++; cont <= 7 + qtdDias; cont++)
            {
                semanaPassada = await _context.Registro
                        .Include(pagamento => pagamento.Pagamento)
                        .Where(item => item.Saida.Value.Day == DateTime.UtcNow.AddDays(-cont).Day && item.Saida.Value.Month == DateTime.UtcNow.AddDays(-cont).Month)
                        .SumAsync(somar => somar.Pagamento.Valor);
            }

            if (semanaPassada == 0)
            {
                totalizador.Comparativo = "sem entradas na última semana";
                totalizador.Porcentagem = 100.00m;
            }
            else
            {
                if (semanaPassada > totalizador.Valor)
                    totalizador.Comparativo = "R$ " + (semanaPassada - totalizador.Valor) + " a menos";
                else
                    totalizador.Comparativo = "R$ " + (semanaPassada - totalizador.Valor) + " a mais";

                totalizador.Porcentagem = ((totalizador.Valor * 100) / semanaPassada) - 100;
            }

            return totalizador;
        }

        public async Task<TotalizadorGenericoDTO> TotalDiaFinanceiro()
        {
            var qtdEsperado = await _context.Registro
                .Include(pagamento => pagamento.Pagamento)
                .Where(item => item.Finalizado == false && item.Entrada.Day == DateTime.UtcNow.Day && item.Entrada.Month == DateTime.UtcNow.Month)
                .CountAsync();
            
            var valorEsperado = await _context.Registro
                .Include(pagamento => pagamento.Pagamento)
                .Where(item => item.Finalizado == true && item.Saida.Value.Day == DateTime.UtcNow.AddDays(-1).Day && item.Saida.Value.Month == DateTime.UtcNow.Month)
                .SumAsync(soma => soma.Pagamento.Valor);

            var totalizador = new TotalizadorGenericoDTO
            {
                Titulo = "Total do Dia",
                Valor = await _context.Registro
                    .Include(pagamento => pagamento.Pagamento)
                    .Where(item => item.Finalizado == true && item.Saida.Value.Day == DateTime.UtcNow.Day && item.Saida.Value.Month == DateTime.UtcNow.Month)
                    .SumAsync(soma => soma.Pagamento.Valor),
                Comparativo = "esperado mais R$ " + (qtdEsperado * 7.99m),
                Porcentagem = (((qtdEsperado * 7.99m) * 100) / valorEsperado) - 100
            };

            return totalizador;
        }

        public async Task<TotalizadorGenericoDTO> TotalMesFinanceiro()
        {
            
            var hoje = DateTime.UtcNow;
            var primeiroDiaMes = new DateTime(hoje.Year, hoje.Month, 1).ToUniversalTime();
            var qtdDias = 0;

            var valorEsperado = await _context.Registro
                .Include(pagamento => pagamento.Pagamento)
                .Where(item => item.Finalizado == true)
                .CountAsync();

            var totalizador = new TotalizadorGenericoDTO();
            totalizador.Titulo = "Total do Mês";

            while (!hoje.Day.Equals(primeiroDiaMes.AddDays(qtdDias).Day))
            {
                var auxValor = await _context.Registro
                    .Include(pagamento => pagamento.Pagamento)
                    .Where(item => item.Finalizado == true && item.Saida.Value.Day == primeiroDiaMes.AddDays(qtdDias).Day)
                    .SumAsync(somar => somar.Pagamento.Valor);

                totalizador.Valor += auxValor;
                qtdDias++;
            }

            qtdDias = 0;
            var qtdEsperado = 0m;

            while (!hoje.Day.Equals(primeiroDiaMes.AddDays(qtdDias).Day))
            {
                var auxValor = await _context.Registro
                    .Include(pagamento => pagamento.Pagamento)
                    .Where(item => item.Finalizado == false && item.Entrada.Day == primeiroDiaMes.AddDays(qtdDias).Day)
                    .CountAsync();

                qtdDias++;

                if (auxValor != 0)
                    qtdEsperado += auxValor * 7.99m * 24 * ((hoje.Day - qtdDias - 1) > 0 ? (hoje.Day - qtdDias - 1) : 1);
            }

            totalizador.Comparativo = "esperado mais R$ " + qtdEsperado;
            totalizador.Porcentagem = 10.0m;

            return totalizador;
        }

        public async Task<List<FinanceiroGraficoBarrasDTO>> QuantidadeVeiculosSaidas(DateTime inicial, DateTime final)
        {
            List<FinanceiroGraficoBarrasDTO> lista = new List<FinanceiroGraficoBarrasDTO>();

            var dateAux = final.Subtract(inicial);
            int quantidadeDias = dateAux.Days;

            for (var cont = 0; cont <= quantidadeDias; cont++)
            {
                var item = new FinanceiroGraficoBarrasDTO();
                item.DiaSemana = inicial.AddDays(cont);
                item.Quantidade = await _context.Registro
                    .Where(data => data.Saida.Value.Day == item.DiaSemana.Day && data.Saida.Value.Month == item.DiaSemana.Month)
                    .CountAsync();

                lista.Add(item);
            }

            return lista;
        }


    }
}
