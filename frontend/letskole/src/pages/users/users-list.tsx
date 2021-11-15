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
import apiUsers from "../../api/api.user";
import Title from "../../components/dashboard/title";
import { User } from "../../models/user";

function UsersList() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [target, setTarget] = useState("");

    function changeRemove(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) {
        const customer = users.find((x) => x.id === id);

        if (customer) {
            //Delete
            setTarget(event.currentTarget.name);
            setLoading(true);
            apiUsers.delete(id).then(() => {
                setLoading(false);
                setUsers(
                    users.filter((x) => x.id !== id)
                );
            });
        }
    }

    useEffect(() => {
        apiUsers.list().then((data) => {
            setUsers(data);
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
                        Listar Clientes
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
                        Se encarga de listar a todos nuestros clientes
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
                        <Title>Lista de Usuarios</Title>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nro</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Dirección</TableCell>
                                        <TableCell>Editar</TableCell>
                                        <TableCell>Detalle</TableCell>
                                        <TableCell>Eliminar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((x, index) => (
                                        <TableRow key={x.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{x.name}</TableCell>
                                            <TableCell> {x.email}</TableCell>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/customers/edit/${x.id}`}
                                                    size={"small"}
                                                    variant="contained"
                                                    color="inherit"
                                                    style={{ width: "100px" }}
                                                    startIcon={
                                                        <span className="material-icons"></span>
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/customers/detail/${x.id}`}
                                                    size={"small"}
                                                    variant="contained"
                                                    color="default"
                                                    style={{ width: "100px" }}
                                                    startIcon={
                                                        <span className="material-icons">info</span>
                                                    }
                                                >
                                                    Detalles
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size={"small"}
                                                    variant="contained"
                                                    color="default"
                                                    style={{ width: "100px" }}
                                                    startIcon={
                                                        <span className="material-icons">
                              delete_outline
                            </span>
                                                    }
                                                >
                                                    Eliminar
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

export default UsersList;
