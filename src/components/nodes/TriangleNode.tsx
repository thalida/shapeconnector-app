import { useEffect, useState } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface IProps extends SvgProps {
  size: number;
  nodeColor: string;
  isSelected?: boolean;
  isPossibleMove?: boolean;
}

export default function TriangleNode({
  size,
  nodeColor,
  isSelected,
  isPossibleMove,
  ...svgProps
}: IProps) {
  const [styles, setStyles] = useState({
    size: 64,
    innerSize: 64,
    fillColor: "#D41167",
    x: 0,
    y: 0,
    fillOpacity: 1,
    strokeColor: "#D41167",
    strokeSize: 8,
    strokeDash: "",
    strokeDashoffset: 0,
    radius: 12,
  });

  useEffect(() => {
    const fillColor = nodeColor;
    const fillOpacity = isSelected ? 0.9 : isPossibleMove ? 0.6 : 1;
    const strokeSize = isPossibleMove ? 4 : 8;
    const strokeColor = isSelected || isPossibleMove ? "#fff" : fillColor;
    const strokeDash = isPossibleMove ? "32 24" : "";
    const strokeDashoffset = 0;
    const radius = size / 2 - strokeSize / 2;
    const innerSize = size - strokeSize;
    const offset = strokeSize / 2;
    const newStyles = {
      size,
      x: offset,
      y: offset,
      innerSize,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeSize,
      strokeDash,
      strokeDashoffset,
      radius,
    };
    setStyles(newStyles);
  }, [size, nodeColor, isSelected, isPossibleMove]);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={styles.size}
      height={styles.size}
      fill="none"
      {...svgProps}
    >
      <Path
        fill={styles.fillColor}
        fillOpacity={styles.fillOpacity}
        stroke={styles.strokeColor}
        strokeDasharray={styles.strokeDash}
        strokeDashoffset={styles.strokeDashoffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={styles.strokeSize}
        d="M20.8871 10.9414C25.1293 1.95571 37.8299 1.72448 42.3964 10.5498L58.6207 41.9054C62.7536 49.8928 56.9562 59.42 47.9629 59.42H16.9354C8.13274 59.42 2.32589 50.2571 6.08393 42.2969L20.8871 10.9414Z"
      />
    </Svg>
  );
}
