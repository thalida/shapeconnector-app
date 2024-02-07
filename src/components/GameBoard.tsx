import { useMemo, useState } from "react";

import { GameNode } from "./GameNode";
import { Box, Text } from "./ui";

import { IGame, INode, IRenderedNode } from "@/types/game";

export function GameBoard({ gameBoard }: { gameBoard: IGame }) {
  const gameGrid = useMemo(() => {
    const grid: IRenderedNode[][] = [];

    for (let i = 0; i < gameBoard.grid.length; i++) {
      for (let j = 0; j < gameBoard.grid[i].length; j++) {
        if (typeof grid[i] === "undefined") {
          grid[i] = [];
        }

        grid[i][j] = {
          ...gameBoard.grid[i][j],
          isSelected: false,
        };
      }
    }

    return grid;
  }, [gameBoard]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {gameGrid.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
          }}
        >
          {row.map((node, nodeIndex) => (
            <GameNode key={nodeIndex} node={node} size={64} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
