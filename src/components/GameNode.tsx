import Node from "./nodes/Node";

import { INode } from "@/types/game";

export function GameNode({
  node,
  size,
  isSelected,
  isPossibleMove,
}: {
  node: INode;
  size: number;
  isSelected?: boolean;
  isPossibleMove?: boolean;
}) {
  return (
    <Node
      nodeShape={node.shape}
      nodeColor={node.color}
      size={size}
      isSelected={isSelected}
      isPossibleMove={isPossibleMove}
    />
  );
}
