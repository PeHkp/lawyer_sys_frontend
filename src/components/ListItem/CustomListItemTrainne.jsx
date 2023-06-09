import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function CustomListItemTrainne(props) {
    return (
        <Grid item xs={12}>
            <Accordion style={{ marginTop: 10, marginBottom: 10 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid item xs={8}>
                        <Typography>{props.trainne?.nome}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography textAlign="right">{"Ativo"}</Typography>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs={6}>
                            <Typography>
                                {`Encerra em: ${props.trainne?.encerramEm}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                {`Data de nascimento: ${props.trainne?.dataNasc}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
