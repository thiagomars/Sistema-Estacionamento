using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.Models
{
    [Table("cliente")]
    public class Cliente
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("sobrenome")]
        public string Sobrenome { get; set; }

        [Column("cpf")]
        public long Cpf { get; set; }

        [Column("id_endereco")]
        public int EnderecoId { get; set; }
        public Endereco Endereco { get; set; }
    }
}
