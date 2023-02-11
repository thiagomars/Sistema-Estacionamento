using System.Text.Json.Serialization;

namespace SistemaEstacionamento.Enumerators
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TipoDocumentoEnum
    {
        RG,
        CPF,
        CNH
    }
}
