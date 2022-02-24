using Microsoft.EntityFrameworkCore.Migrations;

namespace LetSkole.DataAccess.Migrations
{
    public partial class NewestMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_AspNetUsers_ApplicationUserId",
                table: "UserGroups");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "UserGroups",
                newName: "UserId");

            migrationBuilder.AlterColumn<short>(
                name: "Grade",
                table: "UserGroups",
                type: "smallint",
                nullable: true,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AlterColumn<short>(
                name: "MaxGrade",
                table: "Groups",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_AspNetUsers_UserId",
                table: "UserGroups",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_AspNetUsers_UserId",
                table: "UserGroups");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserGroups",
                newName: "ApplicationUserId");

            migrationBuilder.AlterColumn<short>(
                name: "Grade",
                table: "UserGroups",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0,
                oldClrType: typeof(short),
                oldType: "smallint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MaxGrade",
                table: "Groups",
                type: "int",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_AspNetUsers_ApplicationUserId",
                table: "UserGroups",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
