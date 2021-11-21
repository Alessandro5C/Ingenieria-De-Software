import { Button, Grid } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';

import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomTextField from "../../components/custom-text-field/custom-text-field";
import CustomMainForm from "../../components/form/custom-main-form";
import FormControlLabel from '@mui/material/FormControlLabel';

import { DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


import { useHistory, useParams } from "react-router-dom";
import apiCustomers from "../../api/api.customers";
import { Customer } from "../../models/customer";
import { Activity } from "../../models/activity";
import apiActivities from "../../api/api.activity";
import { format } from "date-fns";
import { ApplicationUserResponse } from "../../models/auth/application-user-response";
import { Group } from "../../models/group";
import apiGroups from "../../api/api.group";



function GoupsCreateForm() {
  const history = useHistory();
  const [group, setGroup] = useState<Group>(new Group());

  const appUserData:ApplicationUserResponse = Object.assign(new ApplicationUserResponse,
    JSON.parse(localStorage.getItem('appUserData')));  

  function changeValueActivity(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { value, name } = event.target;
    setGroup({ ...group, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    apiGroups.add(appUserData.userId, group).then(() => {
        history.push("/groups/list");
    })
   }
  
  return (
    <React.Fragment>
      <CustomBodyName>
        {"Agregar un nuevo grupo"}
    </CustomBodyName>
      <CustomBodyDescription>
        {"Este componenete se encarga de agregar un nuevo grupo"}
      </CustomBodyDescription>
      <CustomBody>
        <CustomMainForm
          title={"Agregue un nuevo grupo"}
        >
          <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <CustomTextField
                value={group.name}
                onChange={(event) => changeValueActivity(event)}
                required
                //Es el atributo el " ... "
                name="name"
                label="Nombre"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField
                value={group.description}
                onChange={(event) => changeValueActivity(event)}
                required
                //Es el atributo el " ... "
                name="description"
                label="Descripción"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField
                value={group.maxGrade}
                onChange={(event) => changeValueActivity(event)}
                required
                //Es el atributo el " ... "
                name="maxGrade"
                label="Nota máxima"
                />
            </Grid>
            
            <Button
                  type={"submit"}
                  variant="contained"
                  color={"primary"}
                  startIcon={<span className="material-icons">Agregar</span>}
                >
            </Button>
         </Grid>
          </form>
        </CustomMainForm>

      </CustomBody>
    </React.Fragment>
  );
}

export default GoupsCreateForm;
