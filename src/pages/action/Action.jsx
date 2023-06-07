import { Alert, Autocomplete, Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import CustomListItem from "../../components/ListItem/CustomListItem";
import DefaultButton from "../../components/Button/DefaultButton";
import EmailIcon from '@mui/icons-material/Email';
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import ActionService from "./ActionService";
import CustomListItemAction from "../../components/ListItem/CustomListItemLawyerAction";

const initialState = {
    nome: '',
    status: '',
    descricao: '',
    doc: '',
    lawyerId: 0,
    customerId: 0,
    errorMsg: '',
    actions: [],
    criaAcao: false,
    customers: [],
    lawyers: [],
    statusList: [
        { id: 1, label: 'Em Processo' },
        { id: 2, label: 'Finalizado' },
        { id: 3, label: 'Cancelado' },
    ],
    custo: ''
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

export default function Action() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        nome,
        status,
        descricao,
        doc,
        lawyerId,
        customerId,
        customers,
        lawyers,
        statusList,
        custo
    } = state
    const { errorMsg, actions, criaAcao, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }

    const handleRegister = () => {
        if (nome !== '' && nome !== '' && descricao !== '' && doc !== '') {
            let obj = {
                nome: nome,
                status: status,
                descricao: descricao,
                doc: doc,
                lawyerId: lawyerId,
                customerId: customerId,
                custo: parseFloat(custo)
            }

            ActionService
                .register(obj)
                .then((response) => {
                    dispatch({ type: 'update', data: { criaAcao: false } })
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
        ActionService
            .get()
            .then((response => {
                console.log(response.data)
                dispatch({ type: 'update', data: { actions: response.data.msg } })
            })).catch((e) => {
                console.log(e)
            })

        ActionService
            .getCustomer()
            .then((response) => {
                let customItem = []
                response.data.msg.map((item) => {
                    customItem.push({
                        id: Number(item.id),
                        label: item.Nome
                    })
                })
                dispatch({ type: 'update', data: { customers: customItem } })
            }).catch((e) => {
                console.log(e)
            })

        ActionService
            .getLawyer()
            .then((response) => {
                
                let customItem = []
                response.data.msg.map((item) => {
                    customItem.push({
                        id: Number(item.id),
                        label: item.nome
                    })
                })
                dispatch({ type: 'update', data: { lawyers: customItem } })
            }).catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {

        handleSearch();

    }, [])

    const handleChangeAutoComplete = (value, name) => {
        if (value) {
            let { id } = value
            dispatch({ type: 'update', data: { [name]: id } })
        } else {
            dispatch({ type: 'update', data: { [name]: 0 } })
        }
    }

    return (
        <>
            {!criaAcao ? (
                <Grid container xs={12}>
                    <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                        <Typography variant="h6" textAlign="center">Ação</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        {actions.map((item) => {
                            return (
                                <Grid item xs={10} key={item.id}>
                                    <CustomListItemAction
                                        action={item}
                                        customers={customers}
                                        lawyers={lawyers}
                                        statusList={statusList}
                                        custo={custo}
                                    />
                                </Grid>
                            )
                        })}
                        <Grid item xs={3}>
                            <DefaultButton description="Adicionar" onClick={() => dispatch({ type: 'update', data: { criaAcao: true } })} />
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
                            <Typography variant="h6" textAlign="center">Cadastro de Ação</Typography>
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
                                    error={errorMsg !== '' && nome === ''}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="doc"
                                    label="documento"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={doc}
                                    error={errorMsg !== '' && doc === ''}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="descricao"
                                    label="Descricao"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={descricao}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="custo"
                                    label="Custo"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={custo}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Autocomplete
                                name="customerId"
                                options={customers}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Cliente" variant="standard" />}
                                onChange={(_event, value) => handleChangeAutoComplete(value, 'customerId')}
                                value={customers.find((item) => item.id === customerId)}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Autocomplete
                                name="lawyerId"
                                options={lawyers}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Advogado" variant="standard" />}
                                onChange={(_event, value) => handleChangeAutoComplete(value, 'lawyerId')}
                                value={lawyers.find((item) => item.id === lawyerId)}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Autocomplete
                                name="status"
                                options={statusList}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Status" variant="standard" />}
                                onChange={(_event, value) => handleChangeAutoComplete(value, 'status')}
                                value={statusList.find((item) => item.id === status)}
                            />
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Cancelar" onClick={() => {
                                    dispatch({ type: 'clear' })
                                    handleSearch()
                                }} />
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
