import {
    Button,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/dashboard/title";
import { Game } from "../../models/games";
import	apiGames from "../../api/api.game";

function GamesList() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [target, setTarget] = useState("");

    function changeRemove(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) {
        const customer = games.find((x) => x.id === id);

        if (customer) {
            //Delete
            setTarget(event.currentTarget.name);
            setLoading(true);
        }
    }

    useEffect(() => {
        apiGames.list().then((data) => {
            setGames(data);
            setInitialLoading(false);
            console.log(data);
        });
    }, []);

    return (
        <React.Fragment>
            <Grid item xs={12} md={8} lg={5}>
                <Paper
                    style={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        height: 150,
                    }}
                >
                    <Typography variant="h5">Estas en:</Typography>
                    <Divider />

                    <Typography style={{ marginTop: "10px" }} variant="body2">
                        Listar Juegos
                    </Typography>
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={7}>
                <Paper
                    style={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        height: 150,
                    }}
                >
                    <Typography variant="h5">Descripcion:</Typography>
                    <Divider />

                    <Typography style={{ marginTop: "10px" }} variant="body2">
                        Se encarga de listar todos nuestros juegos
                    </Typography>
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper
                    style={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <React.Fragment>
                        <Title>Lista de Juegos</Title>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nro</TableCell>
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
                                                <Button
                                                    component={Link}
                                                    to={`${x.link}`}
                                                    size={"small"}
                                                    variant="contained"
                                                    color="default"
                                                    style={{ width: "100px" }}
                                                    startIcon={
                                                        <span className="material-icons">info</span>
                                                    }
                                                >
                                                    Jugar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </React.Fragment>
                </Paper>
            </Grid>
        </React.Fragment>
        /*<div>
           {customers.map((customer) => (
              <p key="{customer.customerId}">
                {customer.customerName} - {customer.customerDirection}
              </p>
            ))}
          </div>*/
    );
}

export default GamesList;
