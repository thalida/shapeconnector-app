import { findIndex } from "lodash";
import { set } from "mobx";
import { useEffect, useMemo, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { GameNode } from "./GameNode";
import { Box } from "./ui";

import { IGame, INode } from "@/types/game";

export function GameBoard({ gameBoard }: { gameBoard: IGame }) {
  const nodeStyles = {
    size: 64,
    spacing: 16,
  };
  const [gameLayout, setGameLayout] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);
  const [selectedPath, setSelectedPath] = useState<INode[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const possibleMoves = useMemo(() => {
    if (selectedPath.length === 0 || !isMoving) {
      return [];
    }
    const possibleMoves = gameBoard.grid
      .flat()
      .filter((node) => isValidMove(node));

    return possibleMoves;
  }, [isMoving, selectedPath]);

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .minPointers(1)
    .maxPointers(1)
    .onTouchesDown((event, manager) => {
      validateTouchEvent(event, manager);
    })
    .onTouchesMove((event, manager) => {
      validateTouchEvent(event, manager);
    })
    .onStart((event) => {
      setIsMoving(true);
      handleSelectNode(event);
    })
    .onChange((event) => {
      handleSelectNode(event);
    })
    .onEnd((event) => {
      setIsMoving(false);
      console.log("Pan ended", event);
    });

  function handleGameLayout(event) {
    const { left: x, top: y, width, height } = event.nativeEvent.layout;
    setGameLayout({ x, y, width, height });
  }

  function validateTouchEvent(event, manager) {
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
  }

  function handleSelectNode(event) {
    if (gameLayout === null) {
      return;
    }

    const nodeFullSize = nodeStyles.size + nodeStyles.spacing * 2;
    const row = Math.floor((event.absoluteY - gameLayout.y) / nodeFullSize);
    const col = Math.floor((event.absoluteX - gameLayout.x) / nodeFullSize);

    const nodeX1 = gameLayout.x + col * nodeFullSize;
    const nodeX2 = nodeX1 + nodeFullSize;
    const nodeY1 = gameLayout.y + row * nodeFullSize;
    const nodeY2 = nodeY1 + nodeFullSize;

    const innerX1 = nodeX1 + nodeStyles.spacing;
    const innerX2 = nodeX2 - nodeStyles.spacing;
    const innerY1 = nodeY1 + nodeStyles.spacing;
    const innerY2 = nodeY2 - nodeStyles.spacing;

    if (
      event.absoluteX < innerX1 ||
      event.absoluteX > innerX2 ||
      event.absoluteY < innerY1 ||
      event.absoluteY > innerY2
    ) {
      console.warn("Touch is outside of node");
      return;
    }

    const node = gameBoard.grid[row][col];

    if (isValidBacktrack(node)) {
      setSelectedPath((prev) => {
        const newPath = [...prev];
        newPath.pop();

        return newPath;
      });
      return;
    }

    if (!isValidMove(node)) {
      console.warn("Invalid move");
      return;
    }

    setSelectedPath((prev) => {
      const newPath = [...prev];
      newPath.push(node);

      return newPath;
    });

    console.log("Selected path", selectedPath);
  }

  function isValidMove(node: INode) {
    const lastNode = selectedPath[selectedPath.length - 1];

    if (typeof lastNode === "undefined" || lastNode === null) {
      const isSameAsEndNode =
        node.color === gameBoard.goal.endNode.color &&
        node.shape === gameBoard.goal.endNode.shape;

      const isSameAsStartNode =
        node.color === gameBoard.goal.startNode.color &&
        node.shape === gameBoard.goal.startNode.shape;

      return isSameAsEndNode || isSameAsStartNode;
    }

    if (checkIsSelected(node)) {
      return false;
    }

    if (node.color !== lastNode.color && node.shape !== lastNode.shape) {
      return false;
    }

    const dx = Math.abs(node.x - lastNode.x);
    const dy = Math.abs(node.y - lastNode.y);

    if (dx + dy !== 1) {
      return false;
    }

    return true;
  }

  function isValidBacktrack(node: INode) {
    const parentNode = selectedPath[selectedPath.length - 2];
    if (typeof parentNode === "undefined" || parentNode === null) {
      return false;
    }

    return node.x === parentNode.x && node.y === parentNode.y;
  }

  function checkIsSelected(node: INode) {
    return findIndex(selectedPath, { x: node.x, y: node.y }) !== -1;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: nodeStyles.spacing * 2,
        }}
        onLayout={handleGameLayout}
      >
        {gameBoard.grid.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: nodeStyles.spacing * 2,
            }}
          >
            {row.map((node, nodeIndex) => (
              <GameNode
                key={nodeIndex}
                node={node}
                size={nodeStyles.size}
                isSelected={
                  findIndex(selectedPath, { x: node.x, y: node.y }) !== -1
                }
                isPossibleMove={
                  findIndex(possibleMoves, { x: node.x, y: node.y }) !== -1
                }
              />
            ))}
          </Box>
        ))}
      </Box>
    </GestureDetector>
  );
}
