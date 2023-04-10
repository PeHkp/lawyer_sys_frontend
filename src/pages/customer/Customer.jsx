import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import CustomListItem from "../../components/ListItem/CustomListItem";
import DefaultButton from "../../components/Button/DefaultButton";
import EmailIcon from '@mui/icons-material/Email';
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import RegisterService from "../register/RegisterService";

const initialState = {
    email: '',
    nome: '',
    telefone: '',
    cpf: '',
    idEscritorio: 0,
    cep: '',
    rua: '',
    numero: '',
    estado: '',
    cidade: '',

    errorMsg: '',
    customers: [
        { id: 1, nome: 'Teste', descricao: 'teste teste' },
        { id: 2, nome: 'Teste2', descricao: 'teste teste' },
        { id: 3, nome: 'Teste3', descricao: 'teste teste' },
        { id: 4, nome: 'Teste4', descricao: 'teste teste' },
        { id: 5, nome: 'Teste5', descricao: 'teste teste' },
        { id: 6, nome: 'Teste6', descricao: 'teste teste' }
    ],
    criaCliente: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.data }
        case "clear":
            return initialState
        default:
            return new Error();
    }
}

export default function Customer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        email,
        nome,
        telefone,
        cpf,
        idEscritorio,
        cep,
        rua,
        numero,
        estado,
        cidade
    } = state
    const { errorMsg, customers, criaCliente, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }

    const handleSearchCep = (e) => {
        let regex = /^[0-9]{5}-[0-9]{3}$/
        if (regex.test(cep)) {
            RegisterService
                .getAddres(cep.replace('-', ''))
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data)
                        dispatch({
                            type: 'update', data: {
                                estado: response.data.uf,
                                cidade: response.data.localidade,
                                rua: response.data.logradouro
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

    return (
        <>
            {!criaCliente ? (
                <Grid container xs={12}>
                    <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                        <Typography variant="h6" textAlign="center">Cliente</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        {customers.map((item) => {
                            return (
                                <Grid item xs={10} key={item.id}>
                                    <CustomListItem
                                        nome={item.nome}
                                        descricao={item.descricao}
                                    />
                                </Grid>
                            )
                        })}
                        <Grid item xs={3}>
                            <DefaultButton description="Adicionar" onClick={() => dispatch({ type: 'update', data: { criaCliente: true } })} />
                        </Grid>
                    </Grid>
                </Grid>
            ) :
                <Grid container xs={12} justifyContent="center">
                    <Grid container direction="row" item xs={10} spacing={2}>
                        <Grid item xs={12} style={{marginTop: 50, marginBottom: 30}}>
                            <Typography variant="h6" textAlign="center">Cadastro de Cliente</Typography>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    name="nome"
                                    label="Nome"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    onChange={handleChange}
                                    value={nome}
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
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="cpf"
                                    label="CPF"
                                    variant="standard"
                                    type="cpf"
                                    fullWidth
                                    onChange={handleChange}
                                    value={cpf}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    name="telefone"
                                    label="Telefone"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={telefone}
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
                                    name="numero"
                                    label="Número"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    onChange={handleChange}
                                    value={numero}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="cidade"
                                    label="Cidade"
                                    variant="standard"
                                    fullWidth
                                    value={cidade}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="estado"
                                    label="Estado"
                                    variant="standard"
                                    fullWidth
                                    value={estado}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="rua"
                                    label="Rua"
                                    variant="standard"
                                    fullWidth
                                    value={rua}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Cancelar" onClick={() => dispatch({ type: 'update', data: { criaCliente: false } })} />
                            </Grid>
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Salvar" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}
