import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function CustomListItemAction(props) {
    return (
        <Grid item xs={12}>
            <Accordion style={{ marginTop: 10, marginBottom: 10 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid item xs={8}>
                        <Typography>{props.action?.nome}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography textAlign="right">{`Status: ${props.statusList.find((item) => item.id == props.action?.status)?.label}`}</Typography>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            {`Documento: ${props.action?.doc}`}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ height: 200 }}>
                        <Grid item xs={12}>
                            {"Descrição:"}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {props.action?.descricao}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {`Advogado: ${props.lawyers.find((item) => item.id == props.action?.lawyerId)?.label}`}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs={6}>
                            <Typography>
                                {`Cliente: ${props.customers.find((item) => item.id == props.action?.customerId)?.label}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs={6}>
                            <Typography>
                                {`Custo: ${props.action.custo}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
