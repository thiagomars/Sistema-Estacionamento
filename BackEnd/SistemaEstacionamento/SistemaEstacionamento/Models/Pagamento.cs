using SistemaEstacionamento.Enumerators;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.Models
{
    [Table("pagamento")]
    public class Pagamento
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("formaPagamento")]
        public TipoPagamentoEnum FormaPagamento { get; set; }
        [Column("valor")]
        public decimal Valor { get; set; }
        [Column("observacao")]
        public string Observacao { get; set; }
    }
}
