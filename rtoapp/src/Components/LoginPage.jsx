import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import Welcome from "../Assets/welcome.svg";
import BG from "../Assets/AuthBg.svg";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "100vh",
    backgroundImage: `url(${BG})`,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageGrid: {
    height: "90%",
    backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
    backgroundRepeat: "no-repeat",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    backgroundColor: (t) =>
      t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    height: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomRightRadius: "15px",
    borderTopRightRadius: "15px",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
  },
  contentBox: {
    my: 8,
    mx: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoImage: {
    width: "45%",
  },
  formCaption: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  form: {
    mt: 1,
  },
  emailInput: {
    margin: "normal",
    variant: "standard",
    required: true,
    fullWidth: true,
  },
  passwordInput: {
    margin: "normal",
    variant: "standard",
    required: true,
    fullWidth: true,
  },
  signInButton: {
    type: "submit",
    fullWidth: true,
    variant: "outlined",
    mt: 3,
    mb: 2,
  },
  linksGrid: {
    container: true,
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" underline="none">
        Smarteye systems
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#31C5B5",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

export default function LoginPage() {
  sessionStorage.clear();

  const navigate = useNavigate();
  async function login(email, password) {
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_id: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const data2 = await JSON.stringify(data.user[0]);
        if (data.success) {
          sessionStorage.setItem("loggedin", "true");
          sessionStorage.setItem("user", data2);
          navigate("/user");
        }
        // Handle successful login, e.g., set user state, redirect, or show a success message.
        console.log("Login successful:", data);
      } else {
        // Handle login error, e.g., display an error message.
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    login(email, password);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container style={styles.container}>
        <Grid container sx={styles.grid}>
          <Grid
            item
            xs={false}
            sm={3}
            md={6}
            boxShadow="10"
            sx={styles.imageGrid}
          />
          <Grid
            sx={styles.paper}
            item
            xs={12}
            sm={9}
            md={6}
            component={Paper}
            elevation={8}
            square
          >
            <Box sx={styles.contentBox}>
              <img src={Welcome} style={styles.logoImage} alt="Welcome" />
              <Typography component="p" sx={styles.formCaption}>
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={styles.form}
              >
                <TextField
                  {...styles.emailInput}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  {...styles.passwordInput}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button {...styles.signInButton}>Sign In</Button>
                <Grid container sx={styles.linksGrid}>
                  <Grid item xs>
                    <Link href="#" variant="body2" underline="none">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2" underline="none">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
