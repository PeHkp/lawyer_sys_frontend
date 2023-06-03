import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import CustomListItem from "../../components/ListItem/CustomListItem";
import DefaultButton from "../../components/Button/DefaultButton";
import EmailIcon from '@mui/icons-material/Email';
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import BookService from "./BookService";
import CustomListItemBook from "../../components/ListItem/CustomListItemBook";

const initialState = {
    id: 0,
    nome: '',
    autor: '',
    publicado: '',
    idEscritorio: 0,

    errorMsg: '',
    books: [
        { id: 1, nome: 'Teste', descricao: 'teste teste' },
        { id: 2, nome: 'Teste2', descricao: 'teste teste' },
        { id: 3, nome: 'Teste3', descricao: 'teste teste' },
        { id: 4, nome: 'Teste4', descricao: 'teste teste' },
        { id: 5, nome: 'Teste5', descricao: 'teste teste' },
        { id: 6, nome: 'Teste6', descricao: 'teste teste' }
    ],
    criaLivro: false
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

export default function Book() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        id,
        nome,
        autor,
        publicado,
        idEscritorio
    } = state
    const { errorMsg, criaLivro, books, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }

    useEffect(()=>{
        handleSearch()
    },[])

    const handleSave = () => {
        let obj = {
            nome: nome,
            autor: autor,
            publicado: publicado
        }

        BookService
            .register(obj)
            .then((response) => {
                dispatch({ type: 'update', data: { criaLivro: false } })
                dispatch({ type: 'clear' })
                handleSearch()
            }).catch((e) => {
                console.log(e)
            })
    }

    const handleSearch = () => {
        BookService
            .get()
            .then((response => {
                dispatch({ type: 'update', data: { books: response.data.msg } })
            })).catch((e) => {
                console.log(e)
            })
    }

    return (
        <>
            {!criaLivro ? (
                <Grid container xs={12}>
                    <Grid item xs={12} style={{ marginTop: 50, marginBottom: 30 }}>
                        <Typography variant="h6" textAlign="center">Livros</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        {books.map((item) => {
                            return (
                                <Grid item xs={10} key={item.id}>
                                    <CustomListItemBook
                                        book={item}
                                    />
                                </Grid>
                            )
                        })}
                        <Grid item xs={3}>
                            <DefaultButton description="Adicionar" onClick={() => dispatch({ type: 'update', data: { criaLivro: true } })} />
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
                            <Typography variant="h6" textAlign="center">Cadastro de Livro</Typography>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <TextField
                                name="nome"
                                label="Nome"
                                variant="standard"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={nome}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <TextField
                                name="autor"
                                label="Autor"
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                value={autor}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <TextField
                                name="publicado"
                                label="publicado"
                                variant="standard"
                                fullWidt
                                onChange={handleChange}
                                value={publicado}
                            />
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Cancelar" onClick={() => dispatch({ type: 'update', data: { criaLivro: false } })} />
                            </Grid>
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <DefaultButton description="Salvar" onClick={handleSave}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}
