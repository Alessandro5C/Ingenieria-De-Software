import {
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
import {default as ButtonL} from '@material-ui/core/Button';

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiActivities from "../../api/api.activity";
import apiCustomers from "../../api/api.customers";
import Title from "../../components/dashboard/title";
import { Activity } from "../../models/activity";
import { Customer } from "../../models/customer";
import { User } from "../../models/user";
import Button from '@mui/material/Button';
import { useParams } from "react-router";


function ActivitiesList() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { id } = useParams<{ id: string }>();
  

  const [users, setUsers] = useState<User[]>([]);
  const [target, setTarget] = useState("");

  function changeRemove(id: number) {
    //const activity = activities.find((x) => x.id === id);
    const activity = activities.find((x) => x.id === id);

    if (activity) {
      //Delete
      setLoading(true);
      apiActivities.delete(id).then(() => {
        setLoading(false);
        setActivities(
          activities.filter((activity) => activity.id !== id)
        );
      });
    }
  }

  useEffect(() => {
    apiActivities.listId(id).then((data) => {
      setActivities(data);
      setInitialLoading(false);
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
            Listar Actividades
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
            Se encarga de listar a todos nuestras actividades
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
            <Title>Lista de Actividades</Title>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nro</TableCell>
                    <TableCell>Nombre actividad</TableCell>
                    <TableCell>Descripcion actividad</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Detalle</TableCell>
                    <TableCell>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((activity, index) => (
                    <TableRow key={activity.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell> {activity.description}</TableCell>
                      <TableCell>
                        
                        <ButtonL
                          component={Link}
                          to={`/activities/edit/${activity.id}`}
                          size={"small"}
                          variant="contained"
                          color="inherit"
                          style={{ width: "100px" }}
                          startIcon={
                            <span className="material-icons">Editar</span>
                          }
                        >
                        </ButtonL>


                      </TableCell>
                      <TableCell>


                        <ButtonL
                          component={Link}
                          to={`/activities/detail/${activity.id}`}
                          size={"small"}
                          variant="contained"
                          color="default"
                          style={{ width: "100px" }}
                          startIcon={
                            <span className="material-icons">Detalle</span>
                          }
                        >
                        </ButtonL>


                      </TableCell>
                      <TableCell>
                        <Button onClick={() => changeRemove(activity.id)}>
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

export default ActivitiesList;
