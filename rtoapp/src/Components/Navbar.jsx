import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { BikeScooter, CarRental } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Navbar({ loggedin }) {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    if (loggedin) {
      sessionStorage.clear();
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <AppBar
      position="static"
      style={{
        display: "flex",
        flexDirection: "column",
        margin:"0",
        justifyContent: "center",
        height: "60px",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <BikeScooter />
          <CarRental />
        </IconButton>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          RTO UDAIPUR
        </Typography>
        <Button color="inherit" onClick={handleNavigate}>
          {loggedin ? "logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
