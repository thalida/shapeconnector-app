import { GameBoard } from "./GameBoard";
import { GameScore } from "./GameScore";
import { Box } from "./ui";

export function Game() {
  return (
    <Box>
      <GameScore />
      <GameBoard />
    </Box>
  );
}
