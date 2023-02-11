using SistemaEstacionamento.Enumerators;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.Models
{
    [Table("veiculo")]
    public class Veiculo
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("placa")]
        public string Placa { get; set; }

        [Column("tipo")]
        public TipoVeiculoEnum Tipo { get; set; }

        [Column("data")]
        public DateTime Data { get; set; }

        [Column("id_cliente")]
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; } 
    }
}
