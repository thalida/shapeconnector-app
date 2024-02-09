import { GameNode } from "./GameNode";
import { Box } from "./ui";

import { IGame } from "@/types/game";

export function GameScore({ gameBoard }: { gameBoard: IGame }) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <GameNode node={gameBoard.goal.startNode} size={64} />
      <GameNode node={gameBoard.goal.endNode} size={64} />
    </Box>
  );
}
