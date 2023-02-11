using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.DTOs
{
    public class ListagemEnderecoDTO
    {
        public int Id { get; set; }
        public int Cep { get; set; }
        public string Logradouro { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Uf { get; set; }
    }
}
