import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function allvehicleTable({ info }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        textAlign: "center",
        overflowX: "scroll",
        scrollBehavior:"smooth",
      }}
      className="noscrolbar"
    >
      <Typography variant="h6" color="initial">
        Your Vehicles
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Vehicle</TableCell>
            <TableCell align="right">Reg. No</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Chasis No.</TableCell>
            <TableCell align="right">Engine No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.map((row, index) => (
            <TableRow
              key={row.reg_no}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.make + " " + row.model+" "+row.year}
              </TableCell>
              <TableCell align="right">{row.reg_no}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.chasis_number}</TableCell>
              <TableCell align="right">{row.engine_no}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
