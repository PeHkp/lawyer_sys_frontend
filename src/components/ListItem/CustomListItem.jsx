import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function CustomListItem(props) {
    return (
        <Grid item xs={12}>
            <Accordion style={{ marginTop: 10, marginBottom: 10 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid item xs={8}>
                        <Typography>{props.cliente.Nome}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography textAlign="right">{props.cliente.Nome}</Typography>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12} style={{ height: 200 }}>
                        <Typography>
                            {props.cliente.descricao}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {`Trabalho: ${props.cliente.profissao}`}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs={6}>
                            <Typography>
                                {`Endereço: ${props.cliente.endereco}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                {`Telefone: ${props.cliente.telefone}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
