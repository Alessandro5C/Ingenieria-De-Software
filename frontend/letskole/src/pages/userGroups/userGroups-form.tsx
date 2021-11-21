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
import apiUsers from "../../api/api.user";
import {User} from "../../models/user";
import {TextField} from "@mui/material";

function UsersGroupForm() {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [usergroup, setUserGroup] = useState<userGroup>(new userGroup());
    const [users, setUsers] = useState<User[]>([]);

    const { groupid , userid } = useParams<{ groupid: string , userid: string }>();

    function changeValueUser(
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement >
    ) {
        const { value, name } = event.target;
        setUserGroup({ ...usergroup, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (userid) {
            setLoading(true);
            usergroup.groupId=Number(groupid);
            usergroup.userId=Number(userid);
            apiUserGroup.edit(usergroup).then(() => {
                setUserGroup(usergroup);
            });
         } else {
            setLoading(true);
            apiUserGroup.add(usergroup).then(() => {
                updatedLoading();
            });
        }
        history.push(`/UserGroups/list/${groupid}`);
    }

    function updatedLoading() {
        setLoading(false);
        setOpen(true);
    }

    useEffect(() => {
        if (!userid) {
            apiUsers.list().then((data) => {
                setUsers(data);
                setInitialLoading(false);
            });
        } else {
            setInitialLoading(false);
        }
    }, []);

    return (
        <React.Fragment>
            <CustomBody>
                <CustomMainForm
                    title={userid ? "Edite la nota de su alumno" : "Agregue un nuevo alumno"}
                >
                    <form onSubmit={handleSubmit}>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                { userid && (
                                    <Grid item xs={12} sm={6}>
                                        <CustomTextField
                                            value={usergroup.grade}
                                            onChange={(event) => changeValueUser(event)}
                                            required
                                            name="grade"
                                            label="Nota"
                                        /></Grid>
                                )}
                                { !userid && (
                                    <>
                                        <TextField
                                            fullWidth
                                            select
                                            SelectProps={{
                                                native: true,
                                            }}
                                            variant="outlined"
                                            value={usergroup.userId}
                                            label="¿Eres estudiante?"
                                            onChange={(event) => changeValueUser(event)}
                                            required
                                            name="userId"
                                        >
                                            {users.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.email}
                                                </option>
                                            ))}
                                        </TextField>
                                        <Grid item xs={12} sm={6}>
                                            <CustomTextField
                                                value={usergroup.groupId=Number(groupid)}
                                                label="ID de tu grupo"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <CustomTextField
                                                value={usergroup.userId}
                                                label="ID del alumno"
                                                disabled
                                            />
                                        </Grid>
                                    </>
                                )}

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
                                    { !userid ? "Agregar nuevo alumno" : "Cambiar Nota"}
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