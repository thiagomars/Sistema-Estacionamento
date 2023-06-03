using SistemaEstacionamento.Enumerators;
using System.Text.Json.Serialization;

namespace SistemaEstacionamento.DTOs
{
    public class HomeGraficoPizzaDTO
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TipoVeiculoEnum TipoVeiculo { get; set; }
        public int Quantidade { get; set; }
    }
}
