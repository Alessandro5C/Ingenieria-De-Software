import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomCardBody from "../../components/custom-card/custom-card-body/custom-card-body";
import CustomCardHeader from "../../components/custom-card/custom-card-header/custom-card-header";
import CustomCard from "../../components/custom-card/custom-card/custom-card";
import {User} from "../../models/user";
import apiUsers from "../../api/api.user";
import CustomTextField from "../../components/custom-text-field/custom-text-field";
import CustomDatePicker from "../../components/custom-datepicker/custom-datepicker";
import CustomSelect from "../../components/custom-select/custom-select";

function UsersDetails() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [user, setUser] = useState<User>(new User());
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            apiUsers.detail(id).then((data) => {
                setUser(data);
            });
        }
    }, [id]);

    return (
        <React.Fragment>
            <CustomBody>
                <CustomCard>
                    <CustomCardBody>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    value={user.name}
                                    label="Nombre"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    value={user.email}
                                    label="Correo electrónico"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomSelect
                                    value={user.student}
                                    label="¿Eres estudiante?"
                                    selection={[
                                        {
                                            value: true,
                                            label: "Soy estudiante"
                                        },
                                        {
                                            value: false,
                                            label: "Soy profesor"
                                        }
                                    ]}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    value={user.numTelf}
                                    label="Número de Celular/Teléfono"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomDatePicker
                                    useNative={true}
                                    value={user.birthday}
                                    label="Fecha de Nacimiento"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    value={user.school}
                                    label="Colegio"
                                    disabled
                                />
                            </Grid>

                        </Grid>
                    </CustomCardBody>
                </CustomCard>
            </CustomBody>
        </React.Fragment>
    );
}

export default UsersDetails;
