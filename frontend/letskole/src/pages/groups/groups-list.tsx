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
import apiGroups from "../../api/api.group";
import Title from "../../components/dashboard/title";
import { ApplicationUserResponse } from "../../models/auth/application-user-response";
import { Group } from "../../models/group";
import apiUserGroup from "../../api/api.usergroup";
import { User } from "../../models/user";
import apiUsers from "../../api/api.user";

function GroupsList() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [target, setTarget] = useState("");
    const [userProfile,setUserProfile] = useState<User>(new User());

    const appUserData:ApplicationUserResponse = Object.assign(new ApplicationUserResponse,
        JSON.parse(localStorage.getItem('appUserData')));  

        
    function changeRemove(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) {
        const customer = groups.find((x) => x.id === id);

        if (customer) {
            //Delete
            setTarget(event.currentTarget.name);
            setLoading(true);
        }
    }

    useEffect(() => {
        apiUsers.detail(String(appUserData.userId)).then((data)=>{
            setUserProfile(data);
        });
        console.log(`student boolean ${userProfile.student}`);
        
        apiGroups.teacher(appUserData.userId).then((data) => {
            setGroups(data);
            setInitialLoading(false);
            console.log(data);
        });
    }, []);
    const deleteGroupFromUser = (
        id: number) => {
        apiGroups.delete(id);
    }
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
                                        <TableCell>Descripcion</TableCell>
                                        <TableCell>Editar</TableCell>
                                        <TableCell>Detalle</TableCell>
                                        <TableCell>Eliminar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {groups.map((x, index) => (
                                        <TableRow key={x.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{x.name}</TableCell>
                                            <TableCell> {x.description}</TableCell>
                                            <TableCell>
                                                <Button
                                                    disabled={userProfile.student}
                                                    component={Link}
                                                    to={`/customers/edit/${x.id}`}
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
                                                    component={Link}
                                                    to={`/UserGroups/list/${x.id}`}
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
                                                onClick={() => {
                                                deleteGroupFromUser(x.id);
                                               }}
                                                    disabled={userProfile.student}
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

export default GroupsList;
