using SistemaEstacionamento.Enumerators;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.DTOs
{
    public class RegistrarEntradaDTO
    {
        public string Placa { get; set; }
        public CoresEnum Cor { get; set; }
        public TipoDocumentoEnum TipoDocumento { get; set; }
        public long Documento { get; set; }
        public Boolean Finalizado { get; set; }
    }
}
