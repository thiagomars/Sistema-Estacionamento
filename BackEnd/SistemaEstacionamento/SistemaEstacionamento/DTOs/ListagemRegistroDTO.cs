namespace SistemaEstacionamento.DTOs
{
    public class ListagemRegistroDTO
    {
        public int Id { get; set; }
        public string Entrada { get; set; }
        public string? Saida { get; set; }
        public string PlacaCor { get; set; }
        public Boolean Finalizado { get; set; } 
        public string TipoNumeroDocumento { get; set; }
    }
}
