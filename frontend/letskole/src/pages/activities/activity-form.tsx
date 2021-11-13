import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomTextField from "../../components/custom-text-field/custom-text-field";
import CustomMainForm from "../../components/form/custom-main-form";


import { useHistory, useParams } from "react-router-dom";
import apiCustomers from "../../api/api.customers";
import { Customer } from "../../models/customer";
import { Activity } from "../../models/activity";
import apiActivities from "../../api/api.activity";


function ActivityForm() {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState<Customer>(new Customer());
  const [activity, setActivity] = useState<Activity>(new Activity());
  const [startDate, setStartDate] = useState(new Date());
  
  const { id } = useParams<{ id: string }>();

  function changeValueActivity(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { value, name } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (id) {
      //setLoading(true);
        apiActivities.edit(activity).then(() => {
        // updatedLoading();
        //setMessage("Se edito correctamento el cliente");
        history.push(`/activities/detail/${id}`);
        setActivity(activity);
      });
    } else {

      console.log(activity);
      /*setLoading(true);*/
      apiActivities.add(activity).then(() => {
        //updatedLoading();
        history.push("/activities/list");

        //setMessage("Se agrego correctamento el cliente");
      });
    }
  }

  function updatedLoading() {
    setLoading(false);
    setOpen(true);
  }

  useEffect(() => {
    if (id) {
      apiActivities.detail(id).then((data) => {
        setActivity(data);
        setInitialLoading(false);
      });
    } else {
      setInitialLoading(false);
    }
  }, [id]);

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
