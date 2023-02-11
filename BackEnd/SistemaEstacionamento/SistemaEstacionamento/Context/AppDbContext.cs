using Microsoft.EntityFrameworkCore;
using SistemaEstacionamento.Models;

namespace SistemaEstacionamento.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Endereco> Endereco { get; set; }
        public DbSet<Veiculo> Veiculo { get; set;}
        public DbSet<Registro> Registro { get; set;}
        public DbSet<Pagamento> Pagamento { get; set;}
    }
}
