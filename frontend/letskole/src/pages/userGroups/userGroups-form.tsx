import {Button, Grid, MenuItem} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomTextField from "../../components/custom-text-field/custom-text-field";
import CustomMainForm from "../../components/form/custom-main-form";

import { useHistory, useParams } from "react-router-dom";
import apiUserGroup from "../../api/api.usergroup";
import { userGroup } from "../../models/user-groups";
import CustomSelect from "../../components/custom-select/custom-select";
import CustomDatePicker from "../../components/custom-datepicker/custom-datepicker";

function UsersGroupForm() {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [usergroup, setUserGroup] = useState<userGroup>(new userGroup());

    const { id , userid} = useParams<{ id: string , userid: string }>();

    function changeValueUser(
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement >
    ) {
        const { value, name } = event.target;
        setUserGroup({ ...usergroup, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (id) {
            setLoading(true);
            usergroup.groupId=Number(id);
            usergroup.userId=Number(userid);
            apiUserGroup.edit(usergroup).then(() => {
                // updatedLoading();
                //setMessage("Se edito correctamento el cliente");
                history.push(`/usersgroup/detail/${id}`);
                setUserGroup(usergroup);
            });
         } //else {
        //     //setLoading(true);
        //     //apiUserGroup.add(usergroup).then(() => {
        //         //updatedLoading();
        //        // history.push("/users/list");
        //     });
       // }
    }

    function updatedLoading() {
        setLoading(false);
        setOpen(true);
    }

    // useEffect(() => {
    //     if (id) {
    //         apiUserGroup.detail(id).then((data) => {
    //             setUser(data);
    //             setInitialLoading(false);
    //         });
    //     } else {
    //         setInitialLoading(false);
    //     }
    // }, [id]);

    return (
        <React.Fragment>
            <CustomBodyName>
                {id ? "Editar un cliente" : "Agregar un nuevo usuario"}
            </CustomBodyName>
            <CustomBodyDescription>
                {id
                    ? "Este componenete se encarga de editar un usuario"
                    : "Este componenete se encarga de agregar un nuevo usuario"}
            </CustomBodyDescription>
            <CustomBody>
                <CustomMainForm
                    title={id ? "Edite su cliente" : "Agregue un nuevo usuario"}
                >
                    <form onSubmit={handleSubmit}>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        value={usergroup.grade}
                                        onChange={(event) => changeValueUser(event)}
                                        required
                                        name="grade"
                                        label="Nota"
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
                                    {id ? "Editar" : "Cambiar Nota"}
                                </Button>
                            </div>
                        </React.Fragment>
                    </form>
                </CustomMainForm>
            </CustomBody>
        </React.Fragment>
    );
}

export default UsersGroupForm;