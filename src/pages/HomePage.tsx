import { Grid, Typography } from "@mui/material";
import React from "react";

export default function HomePage() {
  return (
    <Grid
      container
      spacing={2}
      alignContent="center"
      justifyContent='center'
      sx={{ background: "black", height: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography variant="h1" color="white" textAlign="center">
          Miks Casal
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" color="white" textAlign="center">
         Frontend Developer
        </Typography>
        <Typography variant="h4" color="#0BD99E" textAlign="center" >/</Typography>
        <Typography variant="h4" color="white" textAlign="center">
         Violinist
        </Typography>
      </Grid>
      {/* <Grid item xs={6} color="white">
        an epic 3d art here
      </Grid> */}
    </Grid>
  );
}