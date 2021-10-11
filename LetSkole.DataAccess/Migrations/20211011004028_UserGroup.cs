using Microsoft.EntityFrameworkCore.Migrations;

namespace LetSkole.DataAccess.Migrations
{
    public partial class UserGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "userGroups",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CursoId = table.Column<int>(type: "int", nullable: false),
                    Grade = table.Column<short>(type: "smallint", nullable: false),
                    Admin = table.Column<bool>(type: "bit", nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userGroups", x => new { x.UserId, x.CursoId });
                    table.ForeignKey(
                        name: "FK_userGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_userGroups_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_userGroups_GroupId",
                table: "userGroups",
                column: "GroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "userGroups");
        }
    }
}
