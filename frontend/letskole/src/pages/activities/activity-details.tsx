import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiCustomers from "../../api/api.customers";
import apiActivities from "../../api/api.activity";

import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomCardBody from "../../components/custom-card/custom-card-body/custom-card-body";
import CustomCardHeader from "../../components/custom-card/custom-card-header/custom-card-header";
import CustomCard from "../../components/custom-card/custom-card/custom-card";
import format from "date-fns/format";

import { DateTimePicker } from "@material-ui/pickers";
import { Customer } from "../../models/customer";
import { Activity } from "../../models/activity";

function ActivityDetails() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [activity, setActivity] = useState<Activity>(new Activity());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
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
      });
    }
  }, [id]);

  return (
    <React.Fragment>
      <CustomBodyName>Detalles Actividad</CustomBodyName>
      <CustomBodyDescription>
        Se encarga de mostrar los detalles de una actividad
      </CustomBodyDescription>

      <CustomBody>
        <CustomCard>
          <CustomCardHeader>
            <h3> Detalles de la actividad : {activity.name} </h3>
          </CustomCardHeader>
          <CustomCardBody>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <h3> Detalles de la actividad: </h3>
                <h5> Nombre: </h5>
                <p>{ activity.name}</p>
                <h5> Descripción: </h5>
                <p> {activity.description} </p>
                <h5> Completado: </h5>
                <p> {activity.completed == true ? "Si" : "No"} </p>
                <h5> StartDate: </h5>
                <p> <DateTimePicker
                    value={startDate}
                    onChange={() => {}}
                  /></p>
                <h5> EndDate: </h5>
                <p> <DateTimePicker
                    value={endDate}
                    onChange={() => {}}
                  /></p>
                <h5> Start Time: </h5>
                <p> <DateTimePicker
                    value={startTime}
                    onChange={() => {}}
                  /></p>

                <h5> End Time: </h5>
                <p> <DateTimePicker
                    value={endTime}
                    onChange={() => {}}
                  /></p>

              </Grid>
            </Grid>
          </CustomCardBody>
        </CustomCard>
      </CustomBody>
    </React.Fragment>
  );
}

export default ActivityDetails;
