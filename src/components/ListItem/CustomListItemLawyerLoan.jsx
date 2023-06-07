import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function CustomListItemLawyerLoan(props) {
    return (
        <Grid item xs={12}>
            <Accordion style={{ marginTop: 10, marginBottom: 10 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid item xs={8}>
                        <Typography textAlign="left">{`Data de Devolução: ${props.loan.data_dev}`}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography textAlign="right">{`Status: ${props.loan.situacao}`}</Typography>
                    </Grid>

                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
                        <Typography>
                            {`Estagiario: ${props.trainners.find((item) => item.id == props.loan?.intern_id)?.label}`}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs={6}>
                            <Typography>
                                {`Livro: ${props.books.find((item) => item.id == props.loan?.book_id)?.label}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
