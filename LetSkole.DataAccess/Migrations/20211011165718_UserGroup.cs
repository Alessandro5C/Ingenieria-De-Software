using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LetSkole.DataAccess.Migrations
{
    public partial class UserGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoDate",
                table: "Activities");

            migrationBuilder.CreateTable(
                name: "userGroups",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    Grade = table.Column<short>(type: "smallint", nullable: false),
                    Admin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userGroups", x => new { x.UserId, x.GroupId });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "userGroups");

            migrationBuilder.AddColumn<DateTime>(
                name: "DoDate",
                table: "Activities",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
