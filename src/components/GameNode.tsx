import { useMemo } from "react";
import { StyleSheet } from "react-native";

// import CircleNode from "./nodes/SquareNode";
import CircleNode from "./nodes/CircleNode";
import SquareNode from "./nodes/SquareNode";
// import DiamondNode from "./nodes/v1/DiamondNode";
// import TriangleNode from "./nodes/v1/TriangleNode";
import { Box } from "./ui";

import { IGame, IRenderedNode, NODE_COLORS, NODE_SHAPES } from "@/types/game";

export function GameNode({
  node,
  size,
}: {
  node: IRenderedNode;
  size: number;
}) {
  const nodeColorMap = {
    [NODE_COLORS.RED]: "#D41167",
    [NODE_COLORS.GREEN]: "#11D448",
    [NODE_COLORS.BLUE]: "#1148D4",
    [NODE_COLORS.YELLOW]: "#D49211",
  };

  console.log("node", node);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // width: 64,
        // height: 64,
      }}
    >
      {node.shape === NODE_SHAPES.CIRCLE && (
        <CircleNode
          fillColor={nodeColorMap[node.color]}
          size={size}
          isPossibleMove
          isSelected={false}
        />
      )}
      {node.shape === NODE_SHAPES.SQUARE && (
        <SquareNode
          fillColor={nodeColorMap[node.color]}
          size={size}
          isPossibleMove
          isSelected={false}
        />
      )}
      {/* {node.shape === NODE_SHAPES.TRIANGLE && (
        <TriangleNode fillColor={fillColor} size={size} />
      )} */}
      {/* {node.shape === NODE_SHAPES.DIAMOND && (
        <DiamondNode fillColor={fillColor} size={size} />
      )} */}
    </Box>
  );
}
