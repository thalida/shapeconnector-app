import { SvgProps } from "react-native-svg";

import CircleNode from "./CircleNode";
import DiamondNode from "./Diamond";
import SquareNode from "./SquareNode";
import TriangleNode from "./TriangleNode";

import {
  NODE_COLORS,
  NODE_SHAPES,
  TNodeColorValues,
  TNodeShapeValues,
} from "@/types/game";

interface IProps extends SvgProps {
  nodeShape: TNodeShapeValues;
  nodeColor: TNodeColorValues;
  size: number;
  isSelected?: boolean;
  isPossibleMove?: boolean;
}

export default function Node({ nodeShape, nodeColor, ...props }: IProps) {
  const nodeColorMap = {
    [NODE_COLORS.RED]: "#D41167",
    [NODE_COLORS.GREEN]: "#11D448",
    [NODE_COLORS.BLUE]: "#1148D4",
    [NODE_COLORS.YELLOW]: "#D49211",
  };

  switch (nodeShape) {
    case NODE_SHAPES.CIRCLE:
      return <CircleNode nodeColor={nodeColorMap[nodeColor]} {...props} />;
    case NODE_SHAPES.DIAMOND:
      return <DiamondNode nodeColor={nodeColorMap[nodeColor]} {...props} />;
    case NODE_SHAPES.SQUARE:
      return <SquareNode nodeColor={nodeColorMap[nodeColor]} {...props} />;
    case NODE_SHAPES.TRIANGLE:
      return <TriangleNode nodeColor={nodeColorMap[nodeColor]} {...props} />;
    default:
      return null;
  }
}
