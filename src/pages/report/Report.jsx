import { Alert, Autocomplete, Box, Button, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import DefaultButton from "../../components/Button/DefaultButton";
import PhoneIcon from '@mui/icons-material/Phone';
import ReportService from "./ReportService";
const initialState = {
    dataInicio: null,
    dataFim: null,
    errorMsg: '',
    rows: [],
    criaLivro: false,
    tipoRelatorio: 0,
    tipoRelatorioliST: [
        { id: 0, label: 'Ação' },
        { id: 1, label: 'Emprestimo' },
    ],
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

export default function Report() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        dataInicio,
        dataFim,
        tipoRelatorio,
        tipoRelatorioliST
    } = state
    const { errorMsg, criaLivro, rows, ...data } = state

    const handleChange = ({ target: { value, name } }) => {
        dispatch({ type: 'update', data: { [name]: value } })
    }

    const handleSearch = () => {
        if (tipoRelatorio == 0) {
            ReportService
                .getLawsuit({ fromDate: dataInicio, toDate: dataFim })
                .then((response) => {
                    console.log(response.data)
                    dispatch({ type: 'update', data: { rows: response.data.msg } })
                }).catch((e) => {
                    console.log(e)
                })
        } else {
            ReportService
                .getLoan({ fromDate: dataInicio, toDate: dataFim })
                .then((response) => {
                    console.log(response.data)
                    dispatch({ type: 'update', data: { rows: response.data.msg } })
                }).catch((e) => {
                    console.log(e)
                })
        }
    }

    useEffect(()=>{
        handleSearch()
    },[tipoRelatorio])

    const exportReport = () => {
        var dados = '';

        if (tipoRelatorio == 0) {
            let vlrTotal = 0
            dados += "NOME;DESCRICAO;ADVOGADO;CLIENTE;CUSTO\n"
            rows.map((item) => {
                dados += `${item.nome};${item.descricao};${item.advogado}${item.Cliente}$;{item.custo}\n`;
                vlrTotal += parseFloat(item.custo)
            })
            dados += `\n\nVALOR TOTAL;${vlrTotal}`
        } else {
            dados += "ESTAGIARIO;LIVRO;AUTOR;DATA DEVOLUCAO; SITUACAO\n"
            rows.map((item) => {
                dados += `${item.Estagiario};${item.Livro};${item.autor};${item.data_dev};${item.situacao}\n`;
            })
        }

        const blob = new Blob([dados], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `Relatorio.csv`;
        link.href = url;
        link.click();
    }

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
            <Grid container xs={12} justifyContent="center">
                <Grid container direction="row" item xs={10} spacing={2} justifyContent='center'>
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
                        <Typography variant="h6" textAlign="center">Relatório</Typography>
                    </Grid>
                    <Grid item xs={10} md={3}>
                        <p>Tipo relatório</p>
                        <Autocomplete
                            name="tipoRelatorio"
                            options={tipoRelatorioliST}
                            fullWidth
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                            onChange={(_event, value) => handleChangeAutoComplete(value, 'tipoRelatorio')}
                            value={tipoRelatorioliST.find((item) => item.id === tipoRelatorio)}
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <p>Data Inicio</p>
                        <TextField
                            name="dataInicio"
                            variant="standard"
                            fullWidth
                            onChange={handleChange}
                            value={dataInicio}
                            type="date"
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <p>Data Fim</p>
                        <TextField
                            name="dataFim"
                            variant="standard"
                            fullWidth
                            onChange={handleChange}
                            value={dataFim}
                            type="date"
                        />
                    </Grid>
                    <Grid container direction="row" justifyContent="center">
                        <Grid item xs={3} style={{ marginTop: 20 }}>
                            <DefaultButton description="Pesquisar" onClick={handleSearch} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {rows.length > 0 ?
                <>
                    {tipoRelatorio == 0 ?
                        <>
                            <Grid item xs={12} container justifyContent='center' direction='row' style={{ marginTop: 30 }}>
                                <Grid item xs={8}>
                                    <Typography variant="h6" textAlign='center'>Relátorio de Ação</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Nome</TableCell>
                                                    <TableCell align="center">Cliente</TableCell>
                                                    <TableCell align="center">Advogado</TableCell>
                                                    <TableCell align="center">Cliente</TableCell>
                                                    <TableCell align="center">Valor</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="center">{row?.nome}</TableCell>
                                                        <TableCell align="center">{row?.descricao}</TableCell>
                                                        <TableCell align="center">{row?.advogado}</TableCell>
                                                        <TableCell align="center">{row?.Cliente}</TableCell>
                                                        <TableCell align="center">{row?.custo}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: 20 }} container justifyContent='center'>
                                    <Grid item xs={3}>
                                        <DefaultButton description="Exportar" onClick={exportReport} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={12} container justifyContent='center' direction='row' style={{ marginTop: 30 }}>
                                <Grid item xs={8}>
                                    <Typography variant="h6" textAlign='center'>Relátorio de Emprestimo</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Estagiario</TableCell>
                                                    <TableCell align="center">Livro</TableCell>
                                                    <TableCell align="center">Data devolução</TableCell>
                                                    <TableCell align="center">Situação</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="center">{row?.Estagiario}</TableCell>
                                                        <TableCell align="center">{row?.Livro}</TableCell>
                                                        <TableCell align="center">{row?.data_dev}</TableCell>
                                                        <TableCell align="center">{row?.situacao}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: 20 }} container justifyContent='center'>
                                    <Grid item xs={3}>
                                        <DefaultButton description="Exportar" onClick={exportReport} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    }

                </>

                : null}

        </>
    )
}
