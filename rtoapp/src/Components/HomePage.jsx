import React, { useState } from "react";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  createTheme,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { BASE_URL } from "../config";

const HomePage = () => {
  // Create a custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#abab", // Change this to your desired primary color
      },
    },
  });

  // State to store the result
  const [result, setResult] = useState(null);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target);
    const fd = Object.fromEntries(formData);
    try {
      const res = await fetch(`${BASE_URL}/api/getinfo/${fd.registrationNo}`);
      const results = await res.json();

      if (results.length > 0) {
        // Set the first result in the state
        setResult(results[0]);
      } else {
        // Handle the case where there are no results
        setResult(null);
      }
    } catch (e) {
      console.log("Error fetching info: " + e.message);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="xxl"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin:0,
            padding:0,
          }}
        >
          {/* Navbar */}
          <Navbar />

          {/* Showcase */}
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "90%",
              marginTop: "32px",
              height: "350px",
              borderRadius: "15px",
              boxShadow: "1px 5px 8px",
              color: "#adadad",
              backgroundImage:
                "url('https://source.unsplash.com/random/portraits,Nature,Vehicle,Transportation')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "darken",
            }}
          >
            <Container
              style={{
                backgroundColor: "rgba(1,2,12,0.6)",
                textAlign: "center",
                padding: "16px",
                maxWidth: "70%",
                marginBottom: "15px",
                color: "#ffff",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Welcome to Rto Vehicle Information Udaipur
              </Typography>
              <Typography variant="body1">
                😍 it gives you the power to manage and access your vehicle
                related Info easily.😍
              </Typography>
            </Container>
          </Container>

          {/* Check Vehicle Information Form */}
          <Grid
            container
            spacing={2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              style={{ justifyContent: "center" }}
            >
              <form onSubmit={handleFormSubmit}>
                <Box
                  sx={{
                    marginTop: "32px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px",
                    height: "400px",
                  }}
                >
                  <Typography variant="h5" color="primary.text">
                    Check Vehicle Information
                  </Typography>
                  <Typography variant="caption" color="initial">
                    Don't use information for illegal use.
                  </Typography>
                  <TextField
                    sx={{ marginTop: "15px" }}
                    color="secondary"
                    variant="standard"
                    label="Registration No"
                    name="registrationNo"
                    required
                  />
                  <TextField
                    sx={{ marginTop: "15px" }}
                    color="secondary"
                    variant="standard"
                    label="Your Name"
                    name="name"
                    required
                  />
                  <TextField
                    sx={{ marginTop: "15px" }}
                    color="secondary"
                    variant="standard"
                    label="Contact No"
                    name="contactNo"
                    required
                  />
                  <TextField
                    sx={{ marginTop: "15px" }}
                    color="secondary"
                    variant="standard"
                    label="Address"
                    name="address"
                    required
                  />
                  <Button
                    type="submit"
                    style={{ marginTop: "15px" }}
                    variant="contained"
                  >
                    Get Info
                  </Button>
                </Box>
              </form>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              {/* Display the result */}

              {result && (
                <Box
                  sx={{
                    marginTop: "32px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px",
                    height: "400px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary.text"
                    style={{ marginBottom: "15px" }}
                  >
                    Vehicle Information
                  </Typography>
                  <Typography variant="body1">
                    Registration No: {result.reg_no}
                  </Typography>
                  <Typography variant="body1">Make: {result.make}</Typography>
                  <Typography variant="body1">Model: {result.model}</Typography>
                  <Typography variant="body1">Year: {result.year}</Typography>
                  <Typography variant="body1">Color: {result.color}</Typography>
                  <Typography variant="body1">Owner Name: {result.owner_name.split(" ")[0][0]+"___"+result.owner_name.split(" ")[0][result.owner_name.split(" ")[0].length-1]+" "+" "+result.owner_name.split(" ")[1][0]+"___"+result.owner_name.split(" ")[1][result.owner_name.split(" ")[0].length-1]}</Typography>
                  <Typography variant="body1">Insurence End Date: {result.insurance_end}</Typography>
                  <Typography variant="body1">Insurance Provider: {result.insurance_provider}</Typography>
         
                  {/* Add more fields as needed */}
                </Box>
              )}

              {!result && (
                <Box
                  sx={{
                    marginTop: "32px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px",
                    height: "400px",
                  }}
                >
                  <Typography>Search Result Shows Here</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default HomePage;
