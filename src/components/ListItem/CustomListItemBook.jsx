import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function CustomListItemBook(props) {
    return (
        <Grid item xs={12}>
            <Accordion style={{ marginTop: 10, marginBottom: 10 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid item xs={8}>
                        <Typography>{props.book?.nome}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography textAlign="right">{"Ativo"}</Typography>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs={6}>
                            <Typography>
                                {`Autor: ${props.book?.autor}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                {`Publicado: ${props.book?.data_pub}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
