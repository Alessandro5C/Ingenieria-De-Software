import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "@styles/Footer.module.css";

interface Props {
  fixed?: boolean;
  /** @default false */
}

function Copyright() {
  return (
    <Container maxWidth="sm">
      <Typography variant="body2" color="text.secondary">
        {`Copyright © Let Skole ${new Date().getFullYear()}.`}
      </Typography>
    </Container>
  );
}

function CustomFooter({ fixed }: Props) {

  return (
    <div className={!fixed ?
      styles.footer : styles.footerFixed}>
      <hr/>
      <Box
        textAlign="center"
        component="footer"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: "auto"
          // backgroundColor: (theme) =>
          //   theme.palette.mode === "light"
          //     ? theme.palette.grey[200]
          //     : theme.palette.grey[800]
        }}
      >
        <Copyright/>
        {/*<Container maxWidth="sm">*/}
        {/*  <Typography variant="body2"> My sticky footer can be found here. </Typography>*/}
        {/*</Container>*/}
      </Box>
    </div>
  );
}

export default CustomFooter;
