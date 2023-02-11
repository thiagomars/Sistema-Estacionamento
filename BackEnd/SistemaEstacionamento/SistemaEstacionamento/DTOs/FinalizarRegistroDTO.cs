using SistemaEstacionamento.Enumerators;
using SistemaEstacionamento.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.DTOs
{
    public class FinalizarRegistroDTO
    {
        public int IdRegistro { get; set; }

        public TipoPagamentoEnum FormaPagamento { get; set; }
        public decimal Valor { get; set; }
        public string Observacao { get; set; }


        public int? IdCliente { get; set; }

        public int? IdVeiculo { get; set; }
    }
}
