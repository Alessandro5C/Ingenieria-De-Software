import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import { useTranslation } from "next-i18next";
import AuthHandlerContext from "@/contexts/AuthHandler";
import GameResponse from "@/responses/Game";
import apiGame from "@/api/game";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function GamesList() {
  const ctx = React.useContext(AuthHandlerContext);
  const { t } = useTranslation(["common", "games"]);

  const [games, setGames] = React.useState<GameResponse[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [editing, setEditing] = React.useState(false);


  React.useEffect(() => {
    async function handleFetch() {
      try {
        setLoading(true);
        const data = await apiGame.GetAll(ctx.headers);
        setGames(data?.data ?? []);
      } finally {
        setLoading(false);
      }
    }

    handleFetch();
  }, [ctx]);

  return (
    <div>
      <Grid item xs={12}>
        <Paper
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <>
            <h3>Lista de Juegos</h3>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>-</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Link</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell>Detalle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {games.map((x, index) => (
                    <TableRow key={x.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{x.name}</TableCell>
                      <TableCell> {x.link}</TableCell>
                      <TableCell> {x.description}</TableCell>
                      <TableCell>
                        <Button variant="contained" style={{ width: "100px" }}>
                          Jugar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        </Paper>
      </Grid>

    </div>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "games"]))
      // Will be passed to the page component as props
    }
  };
}
