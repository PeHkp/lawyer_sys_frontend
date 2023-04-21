import React, { useReducer } from "react";
import { Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import "./Register.css";
import DefaultButton from "../../components/Button/DefaultButton";
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import { Box } from "@mui/system";
import EmailIcon from '@mui/icons-material/Email';
import RegisterService from "./RegisterService";
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const initialState = {
    username: '',
    email: '',
    cnpj: '',
    phoneNumber: '',
    cep: '',
    address: '',
    number: '',
    neighborhood: '',
    road: '',
    city: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    emailNaoValido: false,
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

export default function Register() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        username,
        email,
        cnpj,
        phoneNumber,
        cep,
        address,
        number,
        neighborhood,
        city,
        password,
        confirmPassword
    } = state
    const { showPassword, showConfirmPassword, emailNaoValido, errorMsg, ...data } = state

    let navigate = useNavigate();

    const handleChange = ({ target: { value, name } }) => {
        if (name === 'cep') {
            value = value.replace(/\D/g, '')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')
        }
        else if (name === 'cnpj') {
            value = value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1')
        } else if (name === 'phoneNumber') {
            value = value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1')
        }

        dispatch({ type: 'update', data: { [name]: value } })
    }

    const handleRegister = () => {
        let obj = {
            email: email,
            nome: username,
            cnpj: cnpj,
            senha: password,
            confirmaSenha: confirmPassword,
            telefone: phoneNumber,
            cep: cep,
            cidade: city,
            bairro: neighborhood,
            rua: address,
            numero: number
        }

        RegisterService
            .register(obj)
            .then((response) => {
                navigate('/login')
            }).catch((e) => {
                console.log(e)
                dispatch({ type: 'update', data: { errorMsg: e.response.data?.msg } })
            })
    }

    const handleShowPassword = () => {
        dispatch({ type: 'update', data: { showPassword: !showPassword } })
    }
    const handleShowConfirmPassword = () => {
        dispatch({ type: 'update', data: { showConfirmPassword: !showConfirmPassword } })
    }

    const handleSearchCep = (e) => {
        let regex = /^[0-9]{5}-[0-9]{3}$/
        if (regex.test(cep)) {
            RegisterService
                .getAddres(cep.replace('-', ''))
                .then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: 'update', data: {
                                neighborhood: response.data.bairro,
                                city: response.data.localidade,
                                address: response.data.logradouro
                            }
                        })
                    }
                }).catch((e) => console.log(e))
        } else {
            dispatch({
                type: 'update', data: {
                    neighborhood: '',
                    city: '',
                    address: ''
                }
            })
        }
    }

    const validaEmail = () => {
        if (/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)) {
            dispatch({ type: 'update', data: { emailNaoValido: false } })
        } else {
            dispatch({ type: 'update', data: { emailNaoValido: true } })
        }
    }

    return (
        <>
            <Grid container direction="row" className="container">
                <Grid
                    container
                    item
                    xs={10}
                    md={8}
                    lg={6}
                    justifyContent="center"
                    rowSpacing={3}
                    columnSpacing={3}
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
                            <Typography variant="h6" align="center">{"Cadastrar"}</Typography>
                        </Grid>
                    </Grid>
                    {
                        errorMsg != '' &&
                        <Typography style={{ color: 'red' }} variant="h6">{errorMsg}</Typography>
                    }

                    <Grid item xs={10} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                name="username"
                                label="Nome"
                                variant="standard"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={username}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                name="email"
                                label="E-mail"
                                variant="standard"
                                type="email"
                                fullWidth
                                onChange={handleChange}
                                value={email}
                                error={emailNaoValido}
                                helperText={emailNaoValido ? "E-mail inválido" : ''}
                                onKeyDown={validaEmail}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField
                                name="cnpj"
                                label="CNPJ"
                                variant="standard"
                                type="cnpj"
                                fullWidth
                                onChange={handleChange}
                                value={cnpj}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                name="phoneNumber"
                                label="Telefone"
                                variant="standard"
                                type="phoneNumber"
                                fullWidth
                                onChange={handleChange}
                                value={phoneNumber}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                name="password"
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                value={password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleShowPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                name="confirmPassword"
                                label="Confirmar Senha"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                value={confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleShowConfirmPassword}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid container
                        direction="row"
                        item
                        xs={10}
                        md={12}
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item xs={5} md={6}>
                            <TextField
                                name="cep"
                                label="CEP"
                                variant="standard"
                                type="cep"
                                fullWidth
                                onChange={handleChange}
                                onKeyDown={handleSearchCep}
                                value={cep}
                            />
                        </Grid>
                        <Grid item xs={5} md={6}>
                            <TextField
                                name="number"
                                label="Número"
                                variant="standard"
                                type="number"
                                fullWidth
                                onChange={handleChange}
                                value={number}
                            />
                        </Grid>
                        {city &&
                            <Grid item xs={12} md={6}>
                                {/* <Typography>{`Cidade: ${city}`}</Typography> */}
                                <TextField
                                    name="city"
                                    label="Cidade"
                                    variant="standard"
                                    fullWidth
                                    value={city}
                                    disabled
                                />
                            </Grid>
                        }
                        {neighborhood &&
                            <Grid item xs={12} md={6}>
                                {/* <Typography>{`Bairro: ${neighborhood}`}</Typography> */}
                                <TextField
                                    name="neighborhood"
                                    label="Bairro"
                                    variant="standard"
                                    fullWidth
                                    value={neighborhood}
                                    disabled
                                />
                            </Grid>
                        }
                        {address &&
                            <Grid item xs={12} md={6}>
                                {/* <Typography>{`Rua: ${address}`}</Typography> */}
                                <TextField
                                    name="address"
                                    label="Rua"
                                    variant="standard"
                                    fullWidth
                                    value={address}
                                    disabled
                                />
                            </Grid>
                        }
                    </Grid>
                    <Grid item xs={10} md={12}>
                        <DefaultButton description="Cadastrar" onClick={handleRegister} />
                    </Grid>
                </Grid>
            </Grid >
        </>
    );
}