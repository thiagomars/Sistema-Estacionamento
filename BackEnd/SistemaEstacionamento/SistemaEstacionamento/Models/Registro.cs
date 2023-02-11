using SistemaEstacionamento.Enumerators;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.Models
{
    [Table("registro")]
    public class Registro
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("entrada")] 
        public DateTime Entrada { get; set; }
        [Column("saida")]
        public DateTime? Saida { get; set; }
        [Column("placa")]
        public string Placa { get; set; }
        [Column("cor")]
        public CoresEnum Cor { get; set; }
        [Column("tipoDocumento")]
        public TipoDocumentoEnum TipoDocumento { get; set; }
        [Column("documento")]
        public long Documento { get; set; }
        [Column("finalizado")]  
        public Boolean Finalizado { get; set; }

        [Column("id_pagamento")]
        public int? PagamentoId { get; set; }
        public Pagamento Pagamento { get; set; }

        [Column("id_cliente")]
        public int? ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        
        [Column("id_veiculo")]
        public int? VeiculoId { get; set; }
        public Veiculo Veiculo { get; set; }
    }
}
