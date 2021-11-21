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
import {Link, useParams} from "react-router-dom";
import apiUserGroup from "../../api/api.usergroup";
import Title from "../../components/dashboard/title";
import { Group } from "../../models/group";
import {userGroup} from "../../models/user-groups"
import apiUsers from "../../api/api.user";

function UserGroupsList() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userGroups, setUserGroups] = useState<userGroup[]>([]);
    const [target, setTarget] = useState("");
    const { groupid } = useParams<{ groupid: string}>();

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

    const deleteUserFromGroup = (
        userId : number, groupId: number) => {
        apiUserGroup.deleteUser(userId,groupId);
    }

    useEffect(() => {
        apiUserGroup.list(Number(groupid)).then((data) => {
            setUserGroups(data);
            setInitialLoading(false);
            console.log(data);
        });
    }, []);

    return (
        <React.Fragment>
            <Button
                component={Link}
                to={`/UserGroups/add/${groupid}`}
                variant="contained"
                color={"primary"}
            >
                Agregar alumnos
            </Button>
            <Grid item xs={12}>
                <Paper
                    style={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <React.Fragment>
                        <Title>Lista de alumnnos</Title>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nro</TableCell>
                                        <TableCell>Id de miembro</TableCell>
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
                                                    to={`/UserGroups/edit/${x.groupId}/${x.userId}`}
                                                    // to={`/customer/add`}
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
                                                    onClick={() => {
                                                        deleteUserFromGroup(x.userId,x.groupId);
                                                    }}
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