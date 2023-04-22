import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function CustomListItemLawyer(props) {
    return (
        <Grid item xs={12}>
            <Accordion style={{ marginTop: 10, marginBottom: 10 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid item xs={8}>
                        <Typography>{props.lawyer?.nome}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography textAlign="right">{"Ativo"}</Typography>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            {"Email:"}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {props.lawyer?.email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ height: 200 }}>
                        <Grid item xs={12}>
                            {"Descrição:"}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {props.lawyer?.descricao}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {`Documento: ${props.lawyer?.documento}`}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs={6}>
                            <Typography>
                                {`OAB: ${props.lawyer?.oab}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                {`Contato: ${props.lawyer?.telefone}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
