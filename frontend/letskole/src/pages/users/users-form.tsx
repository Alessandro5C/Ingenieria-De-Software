import {Button, Grid, MenuItem} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomTextField from "../../components/custom-text-field/custom-text-field";
import CustomMainForm from "../../components/form/custom-main-form";

import { useHistory, useParams } from "react-router-dom";
import apiUsers from "../../api/api.user";
import { User } from "../../models/user";
import CustomSelect from "../../components/custom-select/custom-select";
import CustomDatePicker from "../../components/custom-datepicker/custom-datepicker";

function UsersForm() {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<User>(new User());

    // if ID exists, then its another value than 0
    const { id, email } = useParams<{ id: string, email: string }>();

    function changeValueUser(
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement >
    ) {
        const { value, name } = event.target;
        setUser({ ...user, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (id) {
            setLoading(true);
            apiUsers.edit(user).then(() => { setUser(user) });
        } else {
            apiUsers.add(user).then((data) => {
                history.push(`/users/detail/${data.id}`);
            });
        }
    }

    function updatedLoading() {
        setLoading(false);
        setOpen(true);
    }

    useEffect(() => {
        if (id) {
            apiUsers.detail(id).then((data) => {
                setUser(data);
                setInitialLoading(false);
            });
        } else {
            setInitialLoading(false);
        }
    }, [id]);

    return (
        <React.Fragment>
            <CustomBody>
                <CustomMainForm
                    title={id ? "Edita tu perfil" : "Completa la información de tu perfil"}
                >
                    <form onSubmit={handleSubmit}>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        value={user.name}
                                        onChange={(event) => changeValueUser(event)}
                                        required
                                        name="name"
                                        label="Nombre"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        value={user.email=email}
                                        onChange={(event) => changeValueUser(event)}
                                        required
                                        name="email"
                                        label="Correo electrónico"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomSelect
                                        value={user.student}
                                        label="¿Eres estudiante?"
                                        onChange={(event) => changeValueUser(event)}
                                        required
                                        name="student"
                                        helperText="Selecciona cual es tu rol"
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
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        value={user.numTelf}
                                        onChange={(event) => changeValueUser(event)}
                                        required
                                        name="numTelf"
                                        label="Número de Celular/Teléfono"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomDatePicker
                                        useNative={true}
                                        value={user.birthday}
                                        onChange={(event) => changeValueUser(event)}
                                        required
                                        name="birthday"
                                        label="Fecha de Nacimiento"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        value={user.school}
                                        onChange={(event) => changeValueUser(event)}
                                        required
                                        name="school"
                                        label="Colegio"
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

export default UsersForm;
