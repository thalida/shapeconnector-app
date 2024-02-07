import CircleNode from "./nodes/CircleNode";
import DiamondNode from "./nodes/Diamond";
import SquareNode from "./nodes/SquareNode";
import TriangleNode from "./nodes/TriangleNode";
import { Box } from "./ui";

import { IRenderedNode, NODE_COLORS, NODE_SHAPES } from "@/types/game";

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

  const isPossibleMove = false;
  const isSelected = false;

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
          isPossibleMove={isPossibleMove}
          isSelected={isSelected}
        />
      )}
      {node.shape === NODE_SHAPES.SQUARE && (
        <SquareNode
          fillColor={nodeColorMap[node.color]}
          size={size}
          isPossibleMove={isPossibleMove}
          isSelected={isSelected}
        />
      )}
      {node.shape === NODE_SHAPES.TRIANGLE && (
        <TriangleNode
          fillColor={nodeColorMap[node.color]}
          size={size}
          isPossibleMove={isPossibleMove}
          isSelected={isSelected}
        />
      )}
      {node.shape === NODE_SHAPES.DIAMOND && (
        <DiamondNode
          fillColor={nodeColorMap[node.color]}
          size={size}
          isPossibleMove={isPossibleMove}
          isSelected={isSelected}
        />
      )}
    </Box>
  );
}
