import Node from "./nodes/Node";
import { Box } from "./ui";

import { IRenderedNode } from "@/types/game";

export function GameNode({
  node,
  size,
}: {
  node: IRenderedNode;
  size: number;
}) {
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
      <Node
        shape={node.shape}
        color={node.color}
        size={size}
        isSelected={isSelected}
        isPossibleMove={isPossibleMove}
      />
    </Box>
  );
}
