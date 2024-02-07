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
  shape: TNodeShapeValues;
  color: TNodeColorValues;
  size: number;
  isSelected?: boolean;
  isPossibleMove?: boolean;
}

export default function Node({ shape, color, ...props }: IProps) {
  const nodeColorMap = {
    [NODE_COLORS.RED]: "#D41167",
    [NODE_COLORS.GREEN]: "#11D448",
    [NODE_COLORS.BLUE]: "#1148D4",
    [NODE_COLORS.YELLOW]: "#D49211",
  };

  switch (shape) {
    case NODE_SHAPES.CIRCLE:
      return <CircleNode color={nodeColorMap[color]} {...props} />;
    case NODE_SHAPES.DIAMOND:
      return <DiamondNode color={nodeColorMap[color]} {...props} />;
    case NODE_SHAPES.SQUARE:
      return <SquareNode color={nodeColorMap[color]} {...props} />;
    case NODE_SHAPES.TRIANGLE:
      return <TriangleNode color={nodeColorMap[color]} {...props} />;
    default:
      return null;
  }
}
