import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiCustomers from "../../api/api.customers";
import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomCardBody from "../../components/custom-card/custom-card-body/custom-card-body";
import CustomCardHeader from "../../components/custom-card/custom-card-header/custom-card-header";
import CustomCard from "../../components/custom-card/custom-card/custom-card";
import { Customer } from "../../models/customer";

function CustomersDetails() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer>(new Customer());
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      apiCustomers.detail(id).then((data) => {
        setCustomer(data);
        //setInitialLoading(false);
      });
    }
  }, [id]);

  return (
    <React.Fragment>
      <CustomBodyName>Detalles cliente</CustomBodyName>
      <CustomBodyDescription>
        Se encarga de mostrar los detalles de un cliente
      </CustomBodyDescription>

      <CustomBody>
        <CustomCard>
          <CustomCardHeader>
            <h3> Detalles del cliente : {customer.customerName} </h3>
          </CustomCardHeader>
          <CustomCardBody>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <h3> Detalles del cliente: </h3>
                <h5> Cliente: </h5>
                <p>{customer.customerName}</p>
                <h5> Dirección: </h5>
                <p> {customer.customerDirection} </p>
              </Grid>
            </Grid>
          </CustomCardBody>
        </CustomCard>
      </CustomBody>
    </React.Fragment>
  );
}

export default CustomersDetails;
