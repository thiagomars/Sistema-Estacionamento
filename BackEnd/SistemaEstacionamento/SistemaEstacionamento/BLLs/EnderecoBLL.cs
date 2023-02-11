using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.Context;
using SistemaEstacionamento.DTOs;
using SistemaEstacionamento.Enumerators;
using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.BLLs
{
    public class EnderecoBLL
    {
        private readonly AppDbContext _context;

        public EnderecoBLL(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Endereco> VerificarExistenciaEndereco(int cep, int? numero)
        {
            var enderecoBuscado = await _context.Endereco.Where(item => item.Cep == cep && item.Numero == numero).FirstOrDefaultAsync();

            return enderecoBuscado;
        }

        public async Task<List<Endereco>> BuscarPorCep(int cep)
        {
            var enderecosPorCep = await _context.Endereco.Where(item => item.Cep == cep).ToListAsync();

            return enderecosPorCep;
        }

        public async Task<Endereco> CadastrarEndereco(CreateEnderecoDTO createDTO)
        {
            var verificarEndereco = await VerificarExistenciaEndereco(createDTO.Cep, createDTO.Numero);
            if (verificarEndereco != null)
                throw new Exception("Endereço já cadastrado!");

            Endereco novoEndereco = new Endereco();

            novoEndereco.Cep = createDTO.Cep;
            novoEndereco.Logradouro = createDTO.Logradouro;
            novoEndereco.Complemento = createDTO.Complemento;
            novoEndereco.Bairro = createDTO.Bairro;
            novoEndereco.Cidade = createDTO.Cidade;
            novoEndereco.Uf = createDTO.Uf;
            novoEndereco.Numero = createDTO.Numero;

            await _context.Endereco.AddAsync(novoEndereco);
            _context.SaveChanges();

            return novoEndereco;
        }

        public async Task<List<ListagemEnderecoDTO>> ListagemEndereco(int? cep, string? uf, string? cidade, string? bairro)
        {
            var lista = await _context.Endereco
                .Select(item => new ListagemEnderecoDTO
                {
                    Id = item.Id,
                    Cep = item.Cep,
                    Logradouro = item.Logradouro,
                    Bairro = item.Bairro,
                    Cidade = item.Cidade,
                    Uf = item.Uf
                })
                .ToListAsync();

            if (cep != null)
                lista = lista.Where(item => item.Cep == cep).ToList();

            if (uf != null)
                lista = lista.Where(item => item.Uf == uf).ToList();

            if (cidade != null)
                lista = lista.Where(item => item.Cidade.Contains(cidade)).ToList();

            if (bairro != null)
                lista = lista.Where(item => item.Bairro.Contains(bairro)).ToList();

            return lista;
        }
    }
}