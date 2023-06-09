import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import CustomListItem from "../../components/ListItem/CustomListItem";
import DefaultButton from "../../components/Button/DefaultButton";
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import TrainnerService from "./TrainnerService";
import CustomListItemTrainne from "../../components/ListItem/CustomListItemTrainne";


const initialState = {
    encerraEm: '',
    nome: '',
    dataNasc: '',
    idEscritorio: 0,
    errorMsg: '',
    trainners: [],
    criaEstagiario: false
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

export default function Trainner() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        encerraEm,
        nome,
        dataNasc,
        idEscritorio
    } = state
    const { errorMsg, criaEstagiario, trainners, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }

    useEffect(() => {
        handleSearch()
    }, [])

    const handleSave = () => {
        let obj = {
            nome: nome,
            encerraEm: encerraEm,
            dataNasc: dataNasc
        }

        TrainnerService
            .register(obj)
            .then((response) => {
                dispatch({ type: 'update', data: { criaEstagiario: false } })
                dispatch({ type: 'clear' })
                handleSearch()
            }).catch((e) => {
                console.log(e)
            })
    }

    const handleSearch = () => {
        TrainnerService
            .get()
            .then((response => {
                console.log(response)
                dispatch({ type: 'update', data: { trainners: response.data } })
            })).catch((e) => {
                console.log(e)
            })
    }

    return (
        <>
            {!criaEstagiario ? (
                <Grid container xs={12}>
                    <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                        <Typography variant="h6" textAlign="center">Estágiarios</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        {trainners?.map((item) => {
                            return (
                                <Grid item xs={10} key={item.id}>
                                    <CustomListItemTrainne
                                        trainne={item}
                                    />
                                </Grid>
                            )
                        })}
                        <Grid item xs={3}>
                            <DefaultButton description="Adicionar" onClick={() => dispatch({ type: 'update', data: { criaEstagiario: true } })} />
                        </Grid>
                    </Grid>
                </Grid>
            ) :
                <Grid container xs={12} justifyContent="center">
                    <Grid container direction="row" item xs={10} spacing={2}>
                        <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                            <Typography variant="h6" textAlign="center">Cadastro de Estágiario</Typography>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <p>Nome</p>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    name="nome"
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
                                <p>Data de encerramento</p>
                                <TextField
                                    name="encerraEm"
                                    variant="standard"
                                    type="date"
                                    fullWidth
                                    onChange={handleChange}
                                    value={encerraEm}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <p>Data Nascimento</p>
                                <TextField
                                    name="dataNasc"
                                    type="date"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={dataNasc}
                                />
                            </Box>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Cancelar" onClick={() => dispatch({ type: 'update', data: { criaEstagiario: false } })} />
                            </Grid>
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Salvar" onClick={handleSave} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}
