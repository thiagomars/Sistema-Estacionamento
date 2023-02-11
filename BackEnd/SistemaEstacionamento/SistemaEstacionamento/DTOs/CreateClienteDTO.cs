using SistemaEstacionamento.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.DTOs
{
    public class CreateClienteDTO
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public long Cpf { get; set; }
        public CreateEnderecoDTO CreateEnderecoDTO { get; set; }
    }
}
