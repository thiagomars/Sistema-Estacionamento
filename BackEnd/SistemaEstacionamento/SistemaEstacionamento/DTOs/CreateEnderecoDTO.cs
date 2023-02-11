using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.DTOs
{
    public class CreateEnderecoDTO
    {
        public int Cep { get; set; }
        public string Logradouro { get; set; }
        public string? Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Uf { get; set; }
        public int? Numero { get; set; }
    }
}
