using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Models;
using SistemaEstacionamento.BLLs;
using SistemaEstacionamento.Enumerators;
using Microsoft.OpenApi.Extensions;

namespace SistemaEstacionamento.BLLs
{
    public class VeiculoBLL
    {
        private readonly AppDbContext _context;

        public VeiculoBLL(AppDbContext context)
        {
            _context = context;
        }

        //public async Task<List<Veiculo>> Listar()
        //{
        //    var listaVeiculos = await _context.Veiculo.Include(item => item.Cliente).ToListAsync();

        //    return listaVeiculos;
        //}

        public async Task<Veiculo> BuscarPlaca(string placa)
        {
            var veiculoBuscado = await _context.Veiculo.Where(veiculo => veiculo.Placa == placa).FirstOrDefaultAsync();

            return veiculoBuscado;
        }

        public async Task<Veiculo> CadastrarVeiculo(CreateVeiculoDTO createDTO)
        {
            var verificarVeiculo = await BuscarPlaca(createDTO.Placa);
            if (verificarVeiculo != null)
                throw new Exception("ATENÇÃO: Placa do veículo já cadastrado.");

            var buscarCliente = new ClienteBLL(_context);
            var verificarCliente = await buscarCliente.BuscarPorCpf(createDTO.Cpf);
            if (verificarCliente == null)
                throw new Exception("Cliente não cadastrado");

            var novoVeiculo = new Veiculo();
            novoVeiculo.Placa = createDTO.Placa;
            novoVeiculo.Tipo = createDTO.Tipo;
            novoVeiculo.Data = DateTime.UtcNow;
            novoVeiculo.ClienteId = verificarCliente.Id;

            await _context.Veiculo.AddAsync(novoVeiculo);
            await _context.SaveChangesAsync();

            return novoVeiculo;
        }

        public async Task<List<ListagemVeiculosDTO>> ListarVeiculos(string? placa, string? tipo, string? cliente)
        {
            var lista = await _context.Veiculo
                .Include(cliente => cliente.Cliente)
                .Select(item => new ListagemVeiculosDTO 
                { 
                    Nome = item.Cliente.Nome + " " + item.Cliente.Sobrenome,
                    Cpf = item.Cliente.Cpf,
                    Placa = item.Placa,
                    Tipo = item.Tipo.GetDisplayName(),
                })
                .ToListAsync();

            if (placa != null)
                lista = lista.Where(item => item.Placa.Contains(placa)).ToList();

            if (tipo != null)
                lista = lista.Where(item => item.Tipo == tipo).ToList();

            if (cliente != null)
                lista = lista.Where(item => item.Nome.Contains(cliente)).ToList(); 

            return lista;
        }

    } 
}
