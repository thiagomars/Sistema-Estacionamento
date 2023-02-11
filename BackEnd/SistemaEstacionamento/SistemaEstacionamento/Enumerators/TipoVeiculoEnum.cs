using System.Text.Json.Serialization;

namespace SistemaEstacionamento.Enumerators
{
    //[JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TipoVeiculoEnum
    {
        Ciclomotor_Motoneta,
        Motocicleta,
        Quadriciclo,
        Automovel,
        Microonibus_Onibus
    }
}
