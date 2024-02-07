import { useEffect, useState } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface IProps extends SvgProps {
  size: number;
  fillColor: string;
  isSelected?: boolean;
  isPossibleMove?: boolean;
}

export default function DiamondNode({
  size,
  fillColor,
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
    const fillOpacity = isSelected ? 0.9 : isPossibleMove ? 0.6 : 1;
    const strokeSize = isPossibleMove ? 4 : 8;
    const strokeColor = isSelected || isPossibleMove ? "#fff" : fillColor;
    const strokeDash = isPossibleMove ? "24 16" : "";
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

    console.log("newStyles", newStyles);

    setStyles(newStyles);
  }, [size, fillColor, isSelected, isPossibleMove]);

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
        d="M23.3322 8.05326C28.0571 3.11825 35.9429 3.11827 40.6678 8.05327L55.9521 24.0172C60.4362 28.7008 60.3888 36.0994 55.845 40.7251L40.5608 56.2849C35.8577 61.0727 28.1423 61.0727 23.4393 56.2849L8.15502 40.7251C3.61122 36.0994 3.5638 28.7008 8.04795 24.0172L23.3322 8.05326Z"
      />
    </Svg>
  );
}
