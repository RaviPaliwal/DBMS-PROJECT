import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const tolocalDate = (iso) => {
  const date = new Date(iso);
  // Get local date in dd/mm/yyyy format
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const localDate = date.toLocaleDateString(undefined, options);
  return localDate;
};

export default function InsuranceTable({ info }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        textAlign: "center",
        overflowX: "scroll",
        scrollBehavior: "smooth",
      }}
      className="noscrolbar"
    >
      <Typography variant="h6" color="initial">
        Insurance Information
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Vehicle Name</TableCell>
            <TableCell align="right">Reg. No</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">Expiry Date</TableCell>
            <TableCell align="right">Provider</TableCell>
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
                {row.make + " " + row.model}
              </TableCell>
              <TableCell align="right">{row.reg_no}</TableCell>
              <TableCell align="right">
                {tolocalDate(row.coverage_start_date)}
              </TableCell>
              <TableCell align="right">
                {tolocalDate(row.coverage_end_date)}
              </TableCell>
              <TableCell align="right">{row.provider}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
