import { Button, Grid } from "@mui/material";
import React from "react";
import "./button.css";

export default function DefaultButton(props) {
  return (
    <Grid item xs={12}>
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={props.onClick}
        color="primary"
      >
        {props.description}
      </Button>
    </Grid>
  );
}
