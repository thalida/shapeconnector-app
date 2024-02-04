export const DIFFICULTY = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
} as const;
export type TDifficultyKeys = keyof typeof DIFFICULTY;
export type TDifficultyValues = (typeof DIFFICULTY)[TDifficultyKeys];

export const DEFAULT_DIFFICULTY = DIFFICULTY.EASY;

export const NODE_SHAPES = {
  SQUARE: 1,
  CIRCLE: 2,
  TRIANGLE: 3,
  DIAMOND: 4,
} as const;
export type TNodeShapeKeys = keyof typeof NODE_SHAPES;
export type TNodeShapeValues = (typeof NODE_SHAPES)[TNodeShapeKeys];

export const NODE_COLORS = {
  RED: 1,
  GREEN: 2,
  BLUE: 3,
  YELLOW: 4,
} as const;
export type TNodeColorKeys = keyof typeof NODE_COLORS;
export type TNodeColorValues = (typeof NODE_COLORS)[TNodeColorKeys];

export const DIFFICULTY_MAP = {
  [DIFFICULTY.EASY]: {
    gridSize: 5,
    pathSizeMin: 4,
    pathSizeMax: 7,
    numColors: 4,
    numShapes: 4,
    colorChainMax: 2,
    shapeChainMax: 2,
  },
  [DIFFICULTY.MEDIUM]: {
    gridSize: 7,
    pathSizeMin: 8,
    pathSizeMax: 12,
    numColors: 2,
    numShapes: 4,
    colorChainMax: 4,
    shapeChainMax: 2,
  },
  [DIFFICULTY.HARD]: {
    gridSize: 10,
    pathSizeMin: 14,
    pathSizeMax: 18,
    numColors: 2,
    numShapes: 2,
    colorChainMax: 4,
    shapeChainMax: 4,
  },
};

export interface IGame {
  settings: IGameSettings;
  grid: INode[][];
  goal: IGameGoal;
}

export interface IGameGoal {
  startNode: INode;
  endNode: INode;
  pathSize: number;
}

export interface IGameSettings {
  difficulty: TDifficultyValues;
  pathSize: number;
  colors: TNodeColorValues[];
  shapes: TNodeShapeValues[];
}

export interface INode {
  color: TNodeColorValues;
  shape: TNodeShapeValues;
  x: number;
  y: number;
}
