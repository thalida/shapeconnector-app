import Node from "./nodes/Node";
import { Box } from "./ui/Box";

import { IRenderedNode } from "@/types/game";

export function GameNode({
  node,
  nodeCoords,
  size,
  onLayout,
}: {
  node: IRenderedNode;
  nodeCoords: [number, number];
  size: number;
  onLayout: (
    nodeCoords: [number, number],
    layout: { x: number; y: number; width: number; height: number },
  ) => void;
}) {
  function handleOnLayout(event) {
    const { left: x, top: y, width, height } = event.nativeEvent.layout;
    onLayout(nodeCoords, { x, y, width, height });
  }

  return (
    <Box
      onLayout={handleOnLayout}
      style={{
        padding: 16,
      }}
    >
      <Node
        nodeShape={node.shape}
        nodeColor={node.color}
        size={size}
        isSelected={node.isSelected}
        isPossibleMove={node.isPossibleMove}
      />
    </Box>
  );
}
