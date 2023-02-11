using SistemaEstacionamento.Enumerators;
using SistemaEstacionamento.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaEstacionamento.DTOs
{
    public class CreateVeiculoDTO
    {
        public string Placa { get; set; }

        public TipoVeiculoEnum Tipo { get; set; }

        public long Cpf { get; set; }
    }
}
