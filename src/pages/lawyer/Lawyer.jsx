import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import CustomListItem from "../../components/ListItem/CustomListItem";
import DefaultButton from "../../components/Button/DefaultButton";
import EmailIcon from '@mui/icons-material/Email';
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';

const initialState = {
    id: 0,
    oab: '',
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    id_escritorio: 0,
    errorMsg: '',
    lawyers: [
        { id: 1, nome: 'Teste', descricao: 'teste teste' },
        { id: 2, nome: 'Teste2', descricao: 'teste teste' },
        { id: 3, nome: 'Teste3', descricao: 'teste teste' },
        { id: 4, nome: 'Teste4', descricao: 'teste teste' },
        { id: 5, nome: 'Teste5', descricao: 'teste teste' },
        { id: 6, nome: 'Teste6', descricao: 'teste teste' }
    ],
    criaAdvogado: false
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

export default function Lawyer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        id,
        oab,
        nome,
        cpf,
        telefone,
        email,
        id_escritorio
    } = state
    const { errorMsg, lawyers, criaAdvogado, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }


    return (
        <>
            {!criaAdvogado ? (
                <Grid container xs={12}>
                    <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                        <Typography variant="h6" textAlign="center">Advogados</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        {lawyers.map((item) => {
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
                            <DefaultButton description="Adicionar" onClick={() => dispatch({ type: 'update', data: { criaAdvogado: true } })} />
                        </Grid>
                    </Grid>
                </Grid>
            ) :
                <Grid container xs={12} justifyContent="center">
                    <Grid container direction="row" item xs={10} spacing={2}>
                        <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                            <Typography variant="h6" textAlign="center">Cadastro de Advogado</Typography>
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
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="oab"
                                    label="OAB"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={oab}
                                />
                            </Box>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Cancelar" onClick={() => dispatch({ type: 'update', data: { criaAdvogado: false } })} />
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
