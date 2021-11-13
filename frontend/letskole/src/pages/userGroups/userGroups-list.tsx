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
import apiUserGroup from "../../api/api.usergroup";
import Title from "../../components/dashboard/title";
import { Group } from "../../models/group";
import {userGroup} from "../../models/user-groups"

function UserGroupsList() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userGroups, setUserGroups] = useState<userGroup[]>([]);
    const [target, setTarget] = useState("");

    function changeRemove(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) {
        const customer = userGroups.find((x) => x.groupId === id);

        if (customer) {
            //Delete
            setTarget(event.currentTarget.name);
            setLoading(true);
        }
    }

    useEffect(() => {
        apiUserGroup.list(1).then((data) => {
            setUserGroups(data);
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
                        Listar Grupos
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
                        Se encarga de listar todos los grupos
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
                        <Title>Lista de grupos</Title>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nro</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Nota</TableCell>
                                        <TableCell>Editar</TableCell>
                                        <TableCell>Eliminar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userGroups.map((x, index) => (
                                        <TableRow key={x.groupId}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{x.userId}</TableCell>
                                            <TableCell> {x.grade}</TableCell>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/customers/edit/${x.groupId}`}
                                                    size={"small"}
                                                    variant="contained"
                                                    color="inherit"
                                                    style={{ width: "100px" }}
                                                    startIcon={
                                                        <span className="material-icons">edit</span>
                                                    }
                                                >
                                                    Editar
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

export default UserGroupsList;