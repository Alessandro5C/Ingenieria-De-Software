using Microsoft.EntityFrameworkCore.Migrations;

namespace LetSkole.DataAccess.Migrations
{
    public partial class FromApplicationUserToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_AspNetUsers_ApplicationUserId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_RewardUsers_AspNetUsers_ApplicationUserId",
                table: "RewardUsers");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "RewardUsers",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "Activities",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_ApplicationUserId",
                table: "Activities",
                newName: "IX_Activities_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Rewards",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_AspNetUsers_UserId",
                table: "Activities",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RewardUsers_AspNetUsers_UserId",
                table: "RewardUsers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_AspNetUsers_UserId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_RewardUsers_AspNetUsers_UserId",
                table: "RewardUsers");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "RewardUsers",
                newName: "ApplicationUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Activities",
                newName: "ApplicationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_UserId",
                table: "Activities",
                newName: "IX_Activities_ApplicationUserId");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Rewards",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_AspNetUsers_ApplicationUserId",
                table: "Activities",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RewardUsers_AspNetUsers_ApplicationUserId",
                table: "RewardUsers",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
