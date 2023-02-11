using SistemaEstacionamento.Context;
using SistemaEstacionamento.Models;
using SistemaEstacionamento.DTOs;
using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.Enumerators;
using Microsoft.OpenApi.Extensions;

namespace SistemaEstacionamento.BLLs
{
    public class RegistroBLL
    {
        private readonly AppDbContext _context;

        public RegistroBLL(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Boolean> VerificarEntradaVeiculo(string placa)
        {
            var buscaveiculo = await _context.Registro
                .Where(veiculo => veiculo.Placa == placa && veiculo.Finalizado == false)
                .FirstOrDefaultAsync();

            if(buscaveiculo == null)
                return false;

            return true;
            //Se retorna true é porque ainda o veiculo ainda esta dentro e não registrou saída
        }

        public async Task<Registro> RegistrarEntrada(RegistrarEntradaDTO entradaDTO)
        {
            var verificarVeiculo = await VerificarEntradaVeiculo(entradaDTO.Placa);
            if (verificarVeiculo == true)
                throw new Exception("Veículo já deu entrada e não foi registrado saída. Impossível dar entrada novamente.");

            var entradaVeiculo = new Registro();

            entradaVeiculo.Placa = entradaDTO.Placa;
            entradaVeiculo.Cor = entradaDTO.Cor;
            entradaVeiculo.Documento = entradaDTO.Documento;
            entradaVeiculo.TipoDocumento = entradaDTO.TipoDocumento;
            entradaVeiculo.Finalizado = entradaDTO.Finalizado;
            entradaVeiculo.Entrada = DateTime.UtcNow;

            await _context.Registro.AddAsync(entradaVeiculo);
            await _context.SaveChangesAsync();

            return entradaVeiculo;
        }

        public async Task<List<Registro>> ListarVeiculosEstacionados(string? placa, CoresEnum? cor)
        {
            var listaVeiculos = await _context.Registro.Where(item => item.Finalizado == false).ToListAsync();

            if(cor != null) 
            {
                listaVeiculos = listaVeiculos.Where(itens => itens.Cor == cor && itens.Finalizado == false).ToList();
            }

            if (placa != null)
            {
                listaVeiculos = listaVeiculos.Where(itens => itens.Placa.Contains(placa) && itens.Finalizado == false).ToList();
            }

            return listaVeiculos;
        }

        public async Task<DadosFinalizarRegistro> DadosSaida(int id, Nullable<bool> veiculo, bool cliente)
        {
            var entradaBuscada = await _context.Registro.FindAsync(id);
            if (entradaBuscada == null)
                throw new Exception("Erro ao buscar regisrto. ID consta como finalizado!");

            DadosFinalizarRegistro dados = new DadosFinalizarRegistro();
            dados.Registro = entradaBuscada;

            TimeSpan tempoTotal = DateTime.UtcNow.Subtract(entradaBuscada.Entrada);
            dados.TempoEstacionado = tempoTotal;
            dados.ValorTotal = (tempoTotal.Hours + 1) * 7.99m;

            var varTotal = Convert.ToDouble(dados.ValorTotal);
            var descotoUm = 0.0;
            var descotoDois = 0.0;

            if (cliente)
                descotoUm = (varTotal * 0.1);

            var veiculoBuscado = await _context.Veiculo.Where(veiculo => veiculo.Placa == entradaBuscada.Placa).FirstOrDefaultAsync();
            if(veiculo == null)
            {
                if (veiculoBuscado != null)
                {
                    descotoDois = (varTotal * 0.07);
                    dados.IdVeiculoCadastrado = veiculoBuscado.Id;
                }
            }
            else
            {
                if(veiculo == true)
                {
                    descotoDois = (varTotal * 0.07);

                    if(veiculoBuscado != null)
                        dados.IdVeiculoCadastrado = veiculoBuscado.Id;
                }
            }

            dados.Desconto = Convert.ToDecimal(descotoDois + descotoUm);
            dados.ValorReceber = Convert.ToDecimal(varTotal - descotoDois - descotoUm);

            return dados;
        }

        public async Task EncerrarRegistro(FinalizarRegistroDTO registroDTO)
        {
            var registro = await _context.Registro.Where(item => item.Id == registroDTO.IdRegistro).FirstOrDefaultAsync();
            if (registro.Finalizado == true)
                throw new Exception("Registro já finalizado");

            Pagamento pagamento = new Pagamento();
            pagamento.FormaPagamento = registroDTO.FormaPagamento;
            pagamento.Observacao = registroDTO.Observacao;
            pagamento.Valor = registroDTO.Valor;

            var pagamentoFinal = await _context.Pagamento.AddAsync(pagamento);
            await _context.SaveChangesAsync();

            registro.Finalizado = true;
            registro.PagamentoId = pagamento.Id;

            registro.ClienteId = registroDTO.IdCliente;
            registro.VeiculoId = registroDTO.IdVeiculo;
            registro.Saida = DateTime.UtcNow;

            _context.Registro.Update(registro);
            await _context.SaveChangesAsync();
        }

    }
}
