import React, { useState } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
// import makeStyles from "@mui/material/makeStyles";
import { makeStyles } from "@mui/styles";
import TeacherBadge from "components/TeacherBadge";
import MDTypography from "components/MDTypography";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MDButton from "components/MDButton";
import { toast } from "react-toastify";
import LoadingSpinner from "components/LoadingSpinner";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(2),
    justifyContent: "space-between",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    alignItems: "center",

    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const Leaderboard = ({ data }) => {
  const classes = useStyles();

  const [isLoading, setisLoading] = useState(false);
  const handleSendEmail = async () => {
    try {
      setisLoading(true);

      await axios.get("https://guru-mantra-auth-service.onrender.com/email");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
      toast.success("email sent!");
    }
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <LoadingSpinner isLoading={isLoading} />
      <center>
        <MDTypography textAlign="center" mt={2}>
          <Icon>
            <EmojiEventsIcon />
          </Icon>
          Leader Board
        </MDTypography>
      </center>
      <Table>
        <TableHead>
          {/* <TableRow>
            <TableCell className={classes.tableHeaderCell}>Rank</TableCell>
            <TableCell className={classes.tableHeaderCell}>User</TableCell>
            <TableCell className={classes.tableHeaderCell}>Score</TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: "10px" }}>{index + 1}</TableCell>
              <TableCell>
                <TeacherBadge teacherLevel={item.badge} size="sm" />
                <MDTypography>{item.user}</MDTypography>
              </TableCell>
              <TableCell>{item.score}</TableCell>
              <TableCell>
                <MDButton onClick={handleSendEmail}>Send Appriciation Email</MDButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
