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
import { Link, useParams } from "react-router-dom";
import apiGroups from "../../api/api.group";
import apiRewards from "../../api/api.reward";
import Title from "../../components/dashboard/title";
import { Reward } from "../../models/reward";

function RewardList() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [target, setTarget] = useState("");
    const {id } = useParams<{ id: string}>();//id =userid
    
    useEffect(() => {
          apiRewards.detail(id).then((data) => {
            setRewards(data);
            setInitialLoading(false);
          });   
      }, [id]);


    function changeRemove(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number,userId:number
    ) {
        const customer = rewards.find((x) => x.id === id);

        if (customer) {
            //Delete
            setTarget(event.currentTarget.name);
            setLoading(true);
        }
    }
    const deleteRewardFromUser = (
        userId : string, id: number) => {
        apiRewards.delete(userId,id);
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
                        Listar Logros
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
                        Se encarga de listar todos los 
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
                        <Title>Lista de Logros</Title>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nro</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Descripcion</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rewards.map((x, index) => (
                                        <TableRow key={x.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{x.name}</TableCell>
                                            <TableCell> {x.description}</TableCell>
                                            {<TableCell>
                                                <Button
                                                 onClick={() => {
                                                    deleteRewardFromUser(id,x.id);
                                                 }}
                                                    size={"small"}
                                                    variant="contained"
                                                    color="default"
                                                    style={{ width: "100px" }}
                                                    startIcon={
                                                        <span className="material-icons"></span>
                                                    }
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell> }
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

export default RewardList;
