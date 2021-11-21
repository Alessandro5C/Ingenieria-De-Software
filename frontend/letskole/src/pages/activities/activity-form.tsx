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



function ActivityForm() {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState<Customer>(new Customer());
  const [activity, setActivity] = useState<Activity>(new Activity());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [completed, setCompleted] = useState(false);
  const appUserData:ApplicationUserResponse = Object.assign(new ApplicationUserResponse,
    JSON.parse(localStorage.getItem('appUserData')));

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      apiActivities.detail(id).then((data) => {
        setActivity(data);
        setInitialLoading(false);
        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
        setStartTime(new Date(data.startTime));
        setEndTime(new Date(data.endTime));
        setCompleted(data.completed);
      });

    } else {
      setInitialLoading(false);
    }
  }, [id]);

  function updatedLoading() {
    setLoading(false);
    setOpen(true);
  }
  

  function changeValueActivity(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { value, name } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (id) {
   
        activity.startDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
        activity.endDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");
        activity.startTime = format(startTime, "yyyy-MM-dd'T'HH:mm:ss");
        activity.endTime = format(endTime, "yyyy-MM-dd'T'HH:mm:ss");
        activity.completed = completed;
      //setLoading(true);
        apiActivities.edit(activity).then(() => {
        // updatedLoading();
        //setMessage("Se edito correctamento el cliente");
        history.push(`/activities/detail/${id}`);
        console.log(activity);
        setActivity(activity);
      });
    } else {
        activity.startDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
        activity.endDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");
        activity.startTime = format(startTime, "yyyy-MM-dd'T'HH:mm:ss");
        activity.endTime = format(endTime, "yyyy-MM-dd'T'HH:mm:ss");
        activity.completed = completed;
        activity.userId = appUserData.userId;
        console.log(activity);
        /*setLoading(true);*/
        apiActivities.add(activity).then(() => {
        //updatedLoading();
        history.push("/activities/list");

        //setMessage("Se agrego correctamento el cliente");
      });

    }
  }
  
  const handleCompleted = (event) => {
    setCompleted(event.target.checked);
  };

  return (
    <React.Fragment>
      <CustomBodyName>
        {id ? "Editar una actividad" : "Agregar una nueva actividad"}
      </CustomBodyName>
      <CustomBodyDescription>
        {id
          ? "Este componenete se encarga de editar una actividad"
          : "Este componenete se encarga de agregar una nueva actividad"}
      </CustomBodyDescription>
      <CustomBody>
        <CustomMainForm
          title={id ? "Edite su actividad" : "Agregue una nueva actividad"}
        >
          <form onSubmit={handleSubmit}>

            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <FormControlLabel control={<Switch
                  checked={completed}
                  onChange={handleCompleted}
                  inputProps={{ 'aria-label': 'Completado' }}
                />} label="Completado"></FormControlLabel>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    value={activity.name}
                    onChange={(event) => changeValueActivity(event)}
                    required
                    //Es el atributo el " ... "
                    name="name"
                    label="Nombre"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    value={activity.description}
                    onChange={(event) => changeValueActivity(event)}
                    required  
                    name="description"
                    label="Descripcion"
                  />
                </Grid>

  
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Start Date"
                    inputVariant="outlined"
                    value={startDate}
                    onChange={setStartDate}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="End Date"
                    inputVariant="outlined"
                    value={endDate}
                    onChange={setEndDate}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Start Time"
                    inputVariant="outlined"
                    value={startTime}
                    onChange={setStartTime}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="End Time"
                    inputVariant="outlined"
                    value={endTime}
                    onChange={setEndTime}
                  />
                  </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <Button
                  type={"submit"}
                  variant="contained"
                  color={"primary"}
                  startIcon={<span className="material-icons">send</span>}
                  disabled={loading}
                >
                  {id ? "Editar" : "Agregar"}
                </Button>

              </div>
            </React.Fragment>
          </form>
        </CustomMainForm>

      </CustomBody>
    </React.Fragment>
  );
}

export default ActivityForm;
