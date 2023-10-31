import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const toLocalDate = (iso) => {
  const date = new Date(iso);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString(undefined, options);
};

const OTRTable = ({ data }) => {
  console.log(data)
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
        Ownership Transfer Requests
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Request Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Vehicle ID</TableCell>
            <TableCell>Current Owner ID</TableCell>
            <TableCell>New Owner ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.req_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{toLocalDate(row.req_date)}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.vehicle_id}</TableCell>
              <TableCell>{row.current_owner_id}</TableCell>
              <TableCell>{row.new_owner_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OTRTable;
