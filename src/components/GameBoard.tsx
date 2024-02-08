import { set } from "mobx";
import { useEffect, useMemo, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { GameNode } from "./GameNode";
import { Box } from "./ui";

import { IGame, INode, IRenderedNode } from "@/types/game";

export function GameBoard({ gameBoard }: { gameBoard: IGame }) {
  const [nodeSize, setNodeSize] = useState(0);
  const [gameLayout, setGameLayout] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);
  const [gameGrid, setGameGrid] = useState<IRenderedNode[][]>([]);
  const [numNodes, setNumNodes] = useState(0);
  const [numRenderedNodes, setNumRenderedNodes] = useState(0);

  useEffect(() => {
    const grid: IRenderedNode[][] = [];

    setNumNodes(0);

    for (let i = 0; i < gameBoard.grid.length; i++) {
      for (let j = 0; j < gameBoard.grid[i].length; j++) {
        if (typeof grid[i] === "undefined") {
          grid[i] = [];
        }

        grid[i][j] = {
          ...gameBoard.grid[i][j],
          layout: null,
          isSelected: false,
          isPossibleMove: false,
        };

        setNumNodes((prev) => prev + 1);
      }
    }

    setGameGrid(grid);
  }, [gameBoard]);

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .minPointers(1)
    .maxPointers(1)
    .onTouchesDown((event, manager) => {
      if (numRenderedNodes < numNodes) {
        console.warn(
          `Not all nodes are ready. Expected ${numNodes}, got ${numRenderedNodes}`,
        );
        manager.fail();
        return;
      }

      if (gameLayout === null) {
        console.warn("Game layout not ready");
        manager.fail();
        return;
      }

      const touches = event.allTouches[0];
      const { absoluteX: touchX, absoluteY: touchY } = touches;

      if (
        touchX < gameLayout.x ||
        touchX > gameLayout.x + gameLayout.height ||
        touchY < gameLayout.y ||
        touchY > gameLayout.y + gameLayout.height
      ) {
        console.warn("Touch is outside of game layout");
        manager.fail();
        return;
      }

      manager.activate();

      const row = Math.floor((touchY - gameLayout.y) / nodeSize);
      const col = Math.floor((touchX - gameLayout.x) / nodeSize);

      setGameGrid((prev) => {
        const newGrid = [...prev];
        newGrid[row] = [...prev[row]];
        newGrid[row][col] = {
          ...prev[row][col],
          isSelected: true,
        };

        return newGrid;
      });
    })
    .onTouchesMove((event, manager) => {
      if (numRenderedNodes < numNodes) {
        console.warn(
          `Not all nodes are ready. Expected ${numNodes}, got ${numRenderedNodes}`,
        );
        manager.fail();
        return;
      }

      if (gameLayout === null) {
        console.warn("Game layout not ready");
        manager.fail();
        return;
      }

      const touches = event.allTouches[0];
      const { absoluteX: touchX, absoluteY: touchY } = touches;

      if (
        touchX < gameLayout.x ||
        touchX > gameLayout.x + gameLayout.height ||
        touchY < gameLayout.y ||
        touchY > gameLayout.y + gameLayout.height
      ) {
        console.warn("Touch is outside of game layout");
        manager.fail();
        return;
      }

      manager.activate();

      const row = Math.floor((touchY - gameLayout.y) / nodeSize);
      const col = Math.floor((touchX - gameLayout.x) / nodeSize);

      setGameGrid((prev) => {
        const newGrid = [...prev];
        newGrid[row] = [...prev[row]];
        newGrid[row][col] = {
          ...prev[row][col],
          isSelected: true,
        };

        return newGrid;
      });
    })
    .onEnd((event) => {
      console.log("Pan ended", event);
    });

  function handleGameLayout(event) {
    const { left: x, top: y, width, height } = event.nativeEvent.layout;
    setGameLayout({ x, y, width, height });
  }

  function handleNodeLayout(
    nodeCoords: [number, number],
    {
      x,
      y,
      width,
      height,
    }: { x: number; y: number; width: number; height: number },
  ) {
    const [row, col] = nodeCoords;
    setNodeSize(width);
    setGameGrid((prev) => {
      const newGrid = [...prev];
      newGrid[row] = [...prev[row]];
      newGrid[row][col] = {
        ...prev[row][col],
        layout: { x, y, width, height },
      };

      return newGrid;
    });
    setNumRenderedNodes((prev) => prev + 1);
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onLayout={handleGameLayout}
      >
        {gameGrid.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {row.map((node, nodeIndex) => (
              <GameNode
                key={nodeIndex}
                nodeCoords={[rowIndex, nodeIndex]}
                node={node}
                size={64}
                onLayout={handleNodeLayout}
              />
            ))}
          </Box>
        ))}
      </Box>
    </GestureDetector>
  );
}
