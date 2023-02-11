using SistemaEstacionamento.Enumerators;
using System.Text.Json.Serialization;

namespace SistemaEstacionamento.DTOs
{
    public class GraficoPizzaDTO
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TipoVeiculoEnum TipoVeiculo { get; set; }
        public int Quantidade { get; set; }
    }
}
