using System.Text.Json.Serialization;

namespace SistemaEstacionamento.Enumerators
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CoresEnum
    {
        Branco,
        Preto,
        Vermelho,
        Cinza,
        Prata,
        Azul,
        Verde,
        Amarelo
    }
}
