import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CustomFooter from "../custom/Footer";

interface Props {
  children?: React.ReactNode;
}

export default function SignForm({ children }: Props) {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "85vh",
        overflow: "auto",
        backgroundColor: (theme) => {
          if (theme.palette.mode === "light")
            return "#EDEDED";
        }
      }}
    >
      <Grid item>
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "20%",
                width: "80%"
              }}
            >
              {children}
            </Box>
            <CustomFooter/>
          </Box>
        </Container>
      </Grid>

    </Grid>
  );
}
