import { useEffect, useState } from "react";
import Svg, { SvgProps, Rect } from "react-native-svg";

interface IProps extends SvgProps {
  size: number;
  color: string;
  isSelected?: boolean;
  isPossibleMove?: boolean;
}

export default function CircleNode({
  size,
  color,
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
    strokeSize: 0,
    strokeDash: "",
    strokeDashoffset: 0,
    radius: 12,
  });

  useEffect(() => {
    const fillColor = color;
    const fillOpacity = isSelected ? 0.9 : isPossibleMove ? 0.6 : 1;
    const strokeSize = isSelected ? 8 : isPossibleMove ? 4 : 0;
    const strokeDash = isPossibleMove ? "24 24" : "";
    const strokeDashoffset = isPossibleMove ? -10 : 0;
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
      strokeSize,
      strokeDash,
      strokeDashoffset,
      radius,
    };

    setStyles(newStyles);
  }, [size, color, isSelected, isPossibleMove]);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={styles.size}
      height={styles.size}
      fill="none"
      {...svgProps}
    >
      <Rect
        width={styles.innerSize}
        height={styles.innerSize}
        x={styles.x}
        y={styles.y}
        fill={styles.fillColor}
        fillOpacity={styles.fillOpacity}
        stroke="#fff"
        strokeWidth={styles.strokeSize}
        strokeDasharray={styles.strokeDash}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDashoffset={styles.strokeDashoffset}
        rx={styles.radius}
      />
    </Svg>
  );
}
