using SistemaEstacionamento.Enumerators;

namespace SistemaEstacionamento.DTOs
{
    public class ListagemVeiculosDTO
    {
        public string Placa { get; set; }
        public string Nome { get; set; }
        public long Cpf { get; set; }
        public string Tipo { get; set; }
    }
}
