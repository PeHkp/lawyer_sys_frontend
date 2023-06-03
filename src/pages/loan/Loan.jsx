import { Alert, Autocomplete, Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import CustomListItem from "../../components/ListItem/CustomListItem";
import DefaultButton from "../../components/Button/DefaultButton";
import EmailIcon from '@mui/icons-material/Email';
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import LoanService from "./LoanService";
import CustomListItemLawyerLoan from "../../components/ListItem/CustomListItemLawyerLoan";

const initialState = {
    data_devolucao: '',
    situacao: '',
    idLivro: '',
    idEscritorio: 0,
    idAdvogado: 0,
    errorMsg: '',
    loans: [],
    criaEstagiario: false,
    books: [],
    trainners: [],
    idEstagiario: 0
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

export default function Loan() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        data_devolucao,
        situacao,
        idLivro,
        idEscritorio,
        idAdvogado,
        idEstagiario,
        loans
    } = state
    const { errorMsg, criaEstagiario, trainners, books, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }

    const handleChangeAutoComplete = (value, name) => {
        if (value) {
            let { id } = value
            dispatch({ type: 'update', data: { [name]: id } })
        } else {
            dispatch({ type: 'update', data: { [name]: 0 } })
        }
    }

    const handleSearch = () => {
        LoanService
            .get()
            .then((response => {
                dispatch({ type: 'update', data: { loans: response.data.msg } })
            })).catch((e) => {
                console.log(e)
            })

        LoanService
            .getBook()
            .then((response) => {
                console.log(response)
                let bookItem = []
                response.data.msg.map((item) => {
                    bookItem.push({
                        id: Number(item.id),
                        label: item.Nome
                    })
                })
                dispatch({ type: 'update', data: { books: bookItem } })
            }).catch((e) => {
                console.log(e)
            })

        LoanService
            .getTrainner()
            .then((response) => {
                console.log(response)
                console.log(response.data)
                let trainnerItem = []
                response.data.msg.map((item) => {
                    trainnerItem.push({
                        id: Number(item.Id),
                        label: item.NOme
                    })
                })
                dispatch({ type: 'update', data: { trainners: trainnerItem } })
            }).catch((e) => {
                console.log(e)
            })
    }

    const handleRegister = () => {
        let obj = {
            idLivro: idLivro,
            idEstagiario: idEstagiario,
            dataDevolucao: data_devolucao,
            situacao: situacao
        }

        LoanService
            .register(obj)
            .then((response) => {
                dispatch({ type: 'update', data: { criaAcao: false } })
                dispatch({ type: 'clear' })
                handleSearch()
            }).catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        handleSearch();
    }, [])

    return (
        <>
            {!criaEstagiario ? (
                <Grid container xs={12}>
                    <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                        <Typography variant="h6" textAlign="center">Emprestimo</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        {loans.map((item) => {
                            return (
                                <Grid item xs={10} key={item.id}>
                                    <CustomListItemLawyerLoan
                                        loan={item}
                                        books={books}
                                        trainners={trainners}
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
                            <Typography variant="h6" textAlign="center">Cadastro de Emprestimo</Typography>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Autocomplete
                                name="idLivro"
                                options={books}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Livro" variant="standard" />}
                                onChange={(_event, value) => handleChangeAutoComplete(value, 'idLivro')}
                                value={books.find((item) => item.id === idLivro)}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Autocomplete
                                name="idEstagiario"
                                options={trainners}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Estagiario" variant="standard" />}
                                onChange={(_event, value) => handleChangeAutoComplete(value, 'idEstagiario')}
                                value={trainners.find((item) => item.id === idEstagiario)}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="data_devolucao"
                                    label="Data Devolução"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={data_devolucao}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    name="situacao"
                                    label="Situação"
                                    variant="standard"
                                    fullWidth
                                    onChange={handleChange}
                                    value={situacao}
                                />
                            </Box>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Cancelar" onClick={() => dispatch({ type: 'update', data: { criaEstagiario: false } })} />
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
