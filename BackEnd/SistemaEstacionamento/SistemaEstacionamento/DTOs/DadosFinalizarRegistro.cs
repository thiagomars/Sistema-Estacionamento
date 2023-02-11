using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.DTOs
{
    public class DadosFinalizarRegistro
    {
        public Registro Registro { get; set; }
        public TimeSpan TempoEstacionado { get; set; }
        public decimal ValorTotal { get; set; }
        public decimal Desconto { get; set; }
        public decimal ValorReceber { get; set; }
        public int? IdVeiculoCadastrado { get; set; }
    }
}
