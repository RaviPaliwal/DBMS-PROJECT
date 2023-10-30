import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ThemeProvider, createTheme, Grid, Container } from "@mui/material";
import VehicleTable from "./AllVehicleTable";
import { BASE_URL } from "../config";
import PucTable from "./PucTable";
import InsuranceTable from "./InsuranceTable";
const ctheme = createTheme({
  palette: {
    primary: {
      main: "#afffcf",
    },
  },
});




const UserDashboard = () => {
  const userDataString = JSON.parse(sessionStorage.getItem("user"));
  console.log(userDataString)
  const [info, setInfo] = useState([]);
  const [pucinfo, setPucInfo] = useState([]);
  const [insuranceinfo, setInsInfo] = useState([]);

  useEffect(() => {
    const getallinfo = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/getallvehicles/${userDataString.email_id}`
        );
        const responce = await res.json();
        setInfo(responce);
        console.log(responce);
      } catch (e) {
        console.log(e.message);
      }
    };
    const getpucinfo = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/getpucinfo/${userDataString.email_id}`
        );
        const responce = await res.json();
        setPucInfo(responce);
        console.log(responce);
      } catch (e) {
        console.log(e.message);
      }
    };
    const getinsinfo = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/getinsuranceinfo/${userDataString.email_id}`
        );
        const responce = await res.json();
        setInsInfo(responce);
        console.log(responce);
      } catch (e) {
        console.log(e.message);
      }
    };
    getallinfo();
    getpucinfo();
    getinsinfo();
  }, []);

  return (
    <>
      <ThemeProvider theme={ctheme}>
        <Navbar loggedin={true} />
        <Container style={{display:'flex',flexDirection:"column"}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <VehicleTable info={info} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <PucTable info={pucinfo} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <InsuranceTable info={insuranceinfo} />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default UserDashboard
  
