using System.Text.Json.Serialization;

namespace SistemaEstacionamento.Enumerators
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TipoPagamentoEnum
    {
        DinheiroEspecie,
        CartaoCredito,
        CartaoDebito,
        PIX
    }
}
