using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.Models
{
    [Table("endereco")]
    public class Endereco
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("cep")]
        public int Cep { get; set; }
        [Column("logradouro")]
        public string Logradouro { get; set; }
        [Column("complemento")]
        public string? Complemento { get; set; }
        [Column("bairro")]
        public string Bairro { get; set; }
        [Column("cidade")]
        public string Cidade { get; set; }
        [Column("uf")]
        public string Uf { get; set; }
        [Column("numero")]
        public int? Numero { get; set; }
    }
}
