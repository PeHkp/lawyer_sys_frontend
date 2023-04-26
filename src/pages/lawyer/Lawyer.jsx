import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import CustomListItem from "../../components/ListItem/CustomListItem";
import DefaultButton from "../../components/Button/DefaultButton";
import EmailIcon from '@mui/icons-material/Email';
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import LawyerService from "./LawyerService";
import CustomListItemLawyer from "../../components/ListItem/CustomListItemLawyer";

const initialState = {
    id: 0,
    oab: '',
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    descricao: '',
    id_escritorio: 0,
    documento: '',
    errorMsg: '',
    lawyers: [

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
        id_escritorio,
        descricao,
        documento
    } = state
    const { errorMsg, lawyers, criaAdvogado, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        if (name === 'telefone') {
            value = value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1')
        }

        dispatch({ type: 'update', data: { [name]: value } })
    }

    const handleRegister = () => {
        if (nome !== '' && email !== '' && descricao !== '' && oab !== '' && telefone !== '') {

            let obj = {
                nome: nome,
                email: email,
                descricao: descricao,
                documento: documento,
                oab: oab,
                telefone: telefone
            }

            LawyerService
                .register(obj)
                .then((response) => {
                    dispatch({ type: 'update', data: { criaAdvogado: false } })
                    dispatch({ type: 'clear' })
                    handleSearch()
                }).catch((e) => {
                    console.log(e)
                })

        } else {
            dispatch({ type: 'update', data: { errorMsg: 'Verifique os Campos!' } })
        }
    }

    const handleSearch = () => {
        LawyerService
            .get()
            .then((response => {
                dispatch({ type: 'update', data: { lawyers: response.data.msg } })
            })).catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        handleSearch();
    }, [])


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
                                    <CustomListItemLawyer
                                        lawyer={item}
                                    />
                                </Grid>
                            )
                        })}
                        <Grid item xs={3}>
                            <DefaultButton description="Adicionar" onClick={() => {
                                dispatch({ type: 'update', data: { criaAdvogado: true } })
                                handleSearch()
                            }} />
                        </Grid>
                    </Grid>
                </Grid>
            ) :
                <Grid container xs={12} justifyContent="center">
                    <Grid container direction="row" item xs={10} spacing={2}>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={errorMsg !== ''}
                            action={
                                <Button color="inherit" size="small" onClick={() => dispatch({ type: 'update', data: { errorMsg: '' } })}>
                                    X
                                </Button>
                            }
                            severity="error"
                        >
                            <Alert onClose={() => dispatch({ type: 'update', data: { errorMsg: '' } })} severity="error" sx={{ width: '100%' }}>
                                {errorMsg}
                            </Alert>
                        </Snackbar>
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
                                    error={errorMsg && nome === ''}
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
                                    error={errorMsg && email === ''}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="documento"
                                    label="Documento"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={documento}
                                    error={errorMsg && documento === ''}
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
                                    error={errorMsg && telefone === ''}
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
                                    error={errorMsg && oab === ''}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="descricao"
                                    label="Descrição"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={descricao}
                                />
                            </Box>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Cancelar" onClick={() => dispatch({ type: 'update', data: { criaAdvogado: false } })} />
                            </Grid>
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Salvar" onClick={handleRegister} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}
