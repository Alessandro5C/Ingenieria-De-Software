import * as React from "react";
import { useTranslation } from "next-i18next";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import CustomDrawerListItem from "../drawer/list/Item";
// import CustomDrawerListButton from "../drawer/list/Button";
import AuthHandlerContext from "@/contexts/AuthHandler";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GamesTicTacToeSquare from "@/components/games/TicTacToeSquare";
import Button from "@mui/material/Button";
import SignForm from "@/components/forms/SignForm";
import styles from "@/styles/Games.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// interface Props {
//   logged: boolean;
// }

// const btnColor = "primary";
// const btnLoginIcon = (<LoginOutlinedIcon color={btnColor}/>);
// const btnLogoutIcon = (<LogoutOutlinedIcon color={btnColor}/>);

// function GameTicTacToeBoard({ logged }: Props) {
export default function GameTicTacToeBoard() {
  // const ctx = React.useContext(AuthHandlerContext);
  // const { t } = useTranslation("common");

  // const [cellValue, setCellValue] = React.useState<"X" | "O">("X");

  const [squares, setSquares] = React.useState<any[]>(Array(9).fill(null));
  const [exIsNext, setExIsNext] = React.useState<boolean>(true);
  const [winner, setWinner] = React.useState<string | null>(null);

  const newGame = () => {
    setSquares(Array(9).fill(null));
    setExIsNext(true);
    setWinner(null);
  };

  const player = () => (exIsNext ? "X" : "O");

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const makeMove = (idx: number) => {
    if (!squares[idx]) {
      squares.splice(idx, 1, player());
      setExIsNext(!exIsNext);
    }
    setWinner(calculateWinner());
  };


  return (
    <SignForm>
      <Typography component="h2" variant="h5">
        Current Player: {player()}
      </Typography>
      <Button variant="outlined" color="error" onClick={newGame} sx={{ mt: 2 }}>Start new Game</Button>
      {winner && (
        <Typography component="h2" variant="h5">
          Player {winner} won the game!
        </Typography>
      )}
      <Box sx={{ mt: 2, flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
          {squares?.map((item: any, i: number) => (
            <GamesTicTacToeSquare
              key={i}
              cellValue={item}
              variant="contained"
              onClick={() => { makeMove(i); }}
              sx={{
                width: { xs: 100, sm: 150, md: 200},
                height: { xs: 100, sm: 150, md: 200},
                fontSize: 24,
              }}
            />
          ))}
      </Box>
    </SignForm>
  );
}

// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common", "sign-in"]))
//       // Will be passed to the page component as props
//     }
//   };
// }
