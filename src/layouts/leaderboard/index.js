import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Board from "../../components/Board";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import makeStyles from "@mui/material/makeStyles";
import { makeStyles } from "@mui/styles";

import { useTranslation } from "react-i18next";
import { Card, Typography } from "@mui/material";

import badges from "constants/badges";
import coursesAPIs from "apis/courses.apis";
import { toast } from "react-toastify";
import LoadingSpinner from "components/LoadingSpinner";

function LeaderBoard() {
  const { t } = useTranslation();

  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function getUser(params) {
      try {
        const d = await coursesAPIs.getLeaderBoard();
        setdata(
          d.map((v) => ({
            user: v.username,
            score: v.chaptersCount * 10,
            badge: badges.acharya,
          }))
        );
        console.log(d);
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      } finally {
        setisLoading(false);
      }
    }

    getUser();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <LoadingSpinner isLoading={isLoading} />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Board data={data} />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default LeaderBoard;

// const Board = ({ data }) => {
//   const classes = useStyles();
//   const useStyles = makeStyles((theme) => ({
//     tableContainer: {
//       maxWidth: 600,
//       margin: "auto",
//       marginTop: theme.spacing(2),
//     },
//     tableHeaderCell: {
//       fontWeight: "bold",
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.primary.contrastText,
//     },
//   }));
//   return (
//     <TableContainer component={Paper} className={classes.tableContainer}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell className={classes.tableHeaderCell}>Rank</TableCell>
//             <TableCell className={classes.tableHeaderCell}>User</TableCell>
//             <TableCell className={classes.tableHeaderCell}>Score</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{index + 1}</TableCell>
//               <TableCell>{item.user}</TableCell>
//               <TableCell>{item.score}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

//   const App = () => {
//     return (
//       <div>
//         <h1>Leaderboard</h1>
//         <Leaderboard data={leaderboardData} />
//       </div>
//     );
//   };
