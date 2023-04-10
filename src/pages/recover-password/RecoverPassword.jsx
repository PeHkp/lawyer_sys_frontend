import React, { useReducer } from "react";
import { Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import DefaultButton from "../../components/Button/DefaultButton";
import { useNavigate } from 'react-router-dom';
import { AccountCircle, } from "@mui/icons-material";
import { Box } from "@mui/system";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const initialState = {
    email: '',
    password: '',
    visiblityPassword: false,
    errorMsg: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.data }
        case "clear":
            return initialState
        case 'success':
            return { ...state, success: true, error: false }
        case 'error':
            return { ...state, success: false, error: true }
        case 'close_alert':
            return { ...state, success: false, error: false }
        default:
            return new Error();
    }
}

export default function RecoverPassword() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { email, password } = state
    const { visiblityPassword, errorMsg, ...data } = state

    let navigate = useNavigate();

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }


    const handleRecoverPassword = () => {

    }

    return (
        <Grid container direction="row" className="container">
            <Grid
                container
                item
                xs={11}
                sm={8}
                md={6}
                lg={4}
                justifyContent="center"
                rowSpacing={3}
                className="card"
            >
                <Grid container direction="row" item xs={12} alignItems="center">
                    <Grid item xs={1}>
                        <Tooltip title="Voltar">
                            <IconButton onClick={() => navigate('/login')}>
                                <ArrowCircleLeftIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h6" align="center">{"Recuperar Senha"}</Typography>
                    </Grid>
                </Grid>
                {
                    errorMsg != '' &&
                    <Typography style={{ color: 'red' }} variant="h6">{errorMsg}</Typography>
                }
                <Grid item xs={10} md={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            name="email"
                            label="E-mail"
                            variant="standard"
                            type="email"
                            fullWidth
                            onChange={handleChange}
                            value={email}
                        />
                    </Box>
                </Grid>
                <Grid item xs={10} md={12}>
                    <DefaultButton description="Recuperar" onClick={handleRecoverPassword} />
                </Grid>
            </Grid>
        </Grid>
    )
};
