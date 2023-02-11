using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.DTOs
{
    public class ListagemClientesDTO
    {
        public string NomeCompleto { get; set; }
        public long Cpf { get; set; }
        public Endereco? Endereco { get; set; } 
    }
}
