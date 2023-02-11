using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.BLLs
{
    public class ClienteBLL
    {
        private readonly AppDbContext _context;

        public ClienteBLL(AppDbContext context)
        {
            _context = context;
        }

        //public async Task<List<Cliente>> Listar()
        //{
        //    var lista = await _context.Cliente.Include(endereco => endereco.Endereco).ToListAsync();

        //    return lista;
        //}

        public async Task<Cliente> BuscarPorCpf(long cpf)
        {
            var cliente = await _context.Cliente.Include(endereco => endereco.Endereco).FirstOrDefaultAsync(item => item.Cpf == cpf);

            if (cliente == null)
                throw new Exception("CPF informado não encontrado.");

            return cliente;
        }

        public async Task<Cliente> CadastrarCliente(CreateClienteDTO createDTO)
        {
            if (_context.Cliente.FirstOrDefault(item => item.Cpf == createDTO.Cpf) != null)
                throw new Exception("CPF informado já existe.");

            Cliente novoCliente = new Cliente();
            
            var enderecoBLL = new EnderecoBLL(_context);
            var verificaEndereco = await enderecoBLL.VerificarExistenciaEndereco(createDTO.CreateEnderecoDTO.Cep, (int)createDTO.CreateEnderecoDTO.Numero);

            if (verificaEndereco == null)
                verificaEndereco = await enderecoBLL.CadastrarEndereco(createDTO.CreateEnderecoDTO);

            novoCliente.Cpf = createDTO.Cpf;
            novoCliente.Nome = createDTO.Nome;
            novoCliente.Sobrenome = createDTO.Sobrenome;
            novoCliente.EnderecoId = verificaEndereco.Id;

            await _context.Cliente.AddAsync(novoCliente);
            await _context.SaveChangesAsync();

            return novoCliente;
        }

        public async Task<List<ListagemClientesDTO>> ListarClientes(string? nome, int? cpf, string? estado)
        {
            var lista = await _context.Cliente
                .Include(endereco => endereco.Endereco)
                .Select(item => new ListagemClientesDTO { NomeCompleto = item.Nome + " " + item.Sobrenome, Cpf = item.Cpf, Endereco = item.Endereco })
                .ToListAsync();

            if(nome != null)
                lista = lista.Where(item => item.NomeCompleto.Contains(nome)).ToList();
            
            if(cpf != null)
                lista = lista.Where(item => item.Cpf == cpf).ToList();
            
            if(estado != null)
                lista = lista.Where(item => item.Endereco.Uf == estado).ToList();

            return lista;
            
        }
    }
}
