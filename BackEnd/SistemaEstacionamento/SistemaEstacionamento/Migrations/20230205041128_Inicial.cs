using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SistemaEstacionamento.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "endereco",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cep = table.Column<int>(type: "integer", nullable: false),
                    logradouro = table.Column<string>(type: "text", nullable: false),
                    complemento = table.Column<string>(type: "text", nullable: true),
                    bairro = table.Column<string>(type: "text", nullable: false),
                    cidade = table.Column<string>(type: "text", nullable: false),
                    uf = table.Column<string>(type: "text", nullable: false),
                    numero = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_endereco", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "pagamento",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    formaPagamento = table.Column<int>(type: "integer", nullable: false),
                    valor = table.Column<decimal>(type: "numeric", nullable: false),
                    observacao = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pagamento", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "cliente",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "text", nullable: false),
                    sobrenome = table.Column<string>(type: "text", nullable: false),
                    cpf = table.Column<long>(type: "bigint", nullable: false),
                    idendereco = table.Column<int>(name: "id_endereco", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cliente", x => x.id);
                    table.ForeignKey(
                        name: "FK_cliente_endereco_id_endereco",
                        column: x => x.idendereco,
                        principalTable: "endereco",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "veiculo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    placa = table.Column<string>(type: "text", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false),
                    data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    idcliente = table.Column<int>(name: "id_cliente", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_veiculo", x => x.id);
                    table.ForeignKey(
                        name: "FK_veiculo_cliente_id_cliente",
                        column: x => x.idcliente,
                        principalTable: "cliente",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "registro",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    entrada = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    saida = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    placa = table.Column<string>(type: "text", nullable: false),
                    cor = table.Column<int>(type: "integer", nullable: false),
                    tipoDocumento = table.Column<int>(type: "integer", nullable: false),
                    documento = table.Column<long>(type: "bigint", nullable: false),
                    finalizado = table.Column<bool>(type: "boolean", nullable: false),
                    idpagamento = table.Column<int>(name: "id_pagamento", type: "integer", nullable: true),
                    idcliente = table.Column<int>(name: "id_cliente", type: "integer", nullable: true),
                    idveiculo = table.Column<int>(name: "id_veiculo", type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_registro", x => x.id);
                    table.ForeignKey(
                        name: "FK_registro_cliente_id_cliente",
                        column: x => x.idcliente,
                        principalTable: "cliente",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_registro_pagamento_id_pagamento",
                        column: x => x.idpagamento,
                        principalTable: "pagamento",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_registro_veiculo_id_veiculo",
                        column: x => x.idveiculo,
                        principalTable: "veiculo",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_cliente_id_endereco",
                table: "cliente",
                column: "id_endereco");

            migrationBuilder.CreateIndex(
                name: "IX_registro_id_cliente",
                table: "registro",
                column: "id_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_registro_id_pagamento",
                table: "registro",
                column: "id_pagamento");

            migrationBuilder.CreateIndex(
                name: "IX_registro_id_veiculo",
                table: "registro",
                column: "id_veiculo");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_id_cliente",
                table: "veiculo",
                column: "id_cliente");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "registro");

            migrationBuilder.DropTable(
                name: "pagamento");

            migrationBuilder.DropTable(
                name: "veiculo");

            migrationBuilder.DropTable(
                name: "cliente");

            migrationBuilder.DropTable(
                name: "endereco");
        }
    }
}
