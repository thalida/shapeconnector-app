import { random, shuffle, takeRightWhile } from "lodash";
import { makeAutoObservable } from "mobx";
import { useContext, createContext } from "react";
import { btoa, atob } from "react-native-quick-base64";

import {
  NODE_COLORS,
  NODE_SHAPES,
  DIFFICULTY_MAP,
  IGameSettings,
  IGame,
  INode,
  TDifficultyValues,
  DEFAULT_DIFFICULTY,
  DIFFICULTY,
} from "@/types/game";

export class GameStore {
  game: IGame | null = null;
  encodedGame: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setupGame(
    encodedGame: string | null | undefined,
    difficulty_str: string | null | undefined,
  ) {
    const difficulty = this._parseDifficulty(difficulty_str);
    if (typeof encodedGame === "string" && encodedGame.length > 0) {
      try {
        this.game = gameStore._decodeGame(encodedGame);
        this.encodedGame = encodedGame;
        return;
      } catch (error) {
        throw error;
      }
    }

    this.game = gameStore._createGame(difficulty);
    this.encodedGame = gameStore._encodeGame(this.game);
  }

  private _createGame(difficulty: TDifficultyValues): IGame {
    const { gridSize, numColors, numShapes, pathSizeMin, pathSizeMax } =
      DIFFICULTY_MAP[difficulty];

    const pathSize = random(pathSizeMin, pathSizeMax);

    const colors = shuffle(Object.values(NODE_COLORS)).slice(0, numColors);
    colors.sort();

    const shapes = shuffle(Object.values(NODE_SHAPES)).slice(0, numShapes);
    shapes.sort();

    const gameSettings: IGameSettings = {
      difficulty,
      pathSize,
      colors,
      shapes,
    };

    const grid = new Array(gridSize)
      .fill(null)
      .map(() => new Array(gridSize).fill(null));

    const path = this._generatePath(gameSettings);

    path.forEach((node) => {
      grid[node.y][node.x] = node;
    });

    grid.forEach((row, y) => {
      row.forEach((node, x) => {
        if (node === null) {
          const colorIdx = random(0, colors.length - 1);
          const shapeIdx = random(0, shapes.length - 1);

          grid[y][x] = {
            x,
            y,
            color: colors[colorIdx],
            shape: shapes[shapeIdx],
          };
        }
      });
    });

    return {
      settings: gameSettings,
      grid,
      goal: {
        startNode: path[0],
        endNode: path[path.length - 1],
        pathSize,
      },
    };
  }

  private _encodeGame(game: IGame): string {
    const stringifiedGame = JSON.stringify(game);
    const encodedGame = btoa(stringifiedGame);
    return encodedGame;
  }

  private _decodeGame(encodedGame: string): IGame {
    try {
      const stringifiedGame = atob(encodedGame);
      const game = JSON.parse(stringifiedGame);
      return game;
    } catch (error) {
      throw error;
    }
  }

  private _generatePath(
    gameSettings: IGameSettings,
    parentNode: INode | null = null,
    path: INode[] = [],
    visitedNodes: INode[] = [],
  ): INode[] {
    if (!path) {
      path = [];
    }

    if (path.length === gameSettings.pathSize) {
      return path;
    }

    const difficultySettings = DIFFICULTY_MAP[gameSettings.difficulty];

    if (parentNode === null) {
      const x = random(0, difficultySettings.gridSize - 1);
      const y = random(0, difficultySettings.gridSize - 1);
      const colorIdx = random(0, gameSettings.colors.length - 1);
      const shapeIdx = random(0, gameSettings.shapes.length - 1);

      const node = {
        x,
        y,
        color: gameSettings.colors[colorIdx],
        shape: gameSettings.shapes[shapeIdx],
      };

      path.push(node);
      visitedNodes.push(node);
      return this._generatePath(gameSettings, node, path, visitedNodes);
    }

    const potentialNeighbors = [
      { x: parentNode.x + 1, y: parentNode.y },
      { x: parentNode.x - 1, y: parentNode.y },
      { x: parentNode.x, y: parentNode.y + 1 },
      { x: parentNode.x, y: parentNode.y - 1 },
    ];

    const eligibleNeighbors = potentialNeighbors.filter(
      ({ x, y }) =>
        x >= 0 &&
        x < difficultySettings.gridSize &&
        y >= 0 &&
        y < difficultySettings.gridSize &&
        !visitedNodes.some((node) => node.x === x && node.y === y),
    );

    if (eligibleNeighbors.length === 0) {
      path.pop();
      const grandparentNode = path[path.length - 1];

      return this._generatePath(
        gameSettings,
        grandparentNode,
        path,
        visitedNodes,
      );
    }

    const randomMove =
      eligibleNeighbors[random(0, eligibleNeighbors.length - 1)];
    const newNode = {
      x: randomMove.x,
      y: randomMove.y,
      color: parentNode.color,
      shape: parentNode.shape,
    };

    const colorChain = takeRightWhile(
      path,
      (node) => node.color === newNode.color,
    );
    const shapeChain = takeRightWhile(
      path,
      (node) => node.shape === newNode.shape,
    );

    let keepColor: boolean;
    if (colorChain.length >= difficultySettings.colorChainMax) {
      keepColor = false;
    } else if (shapeChain.length >= difficultySettings.shapeChainMax) {
      keepColor = true;
    } else {
      keepColor = random(0, 1) === 1;
    }

    if (keepColor) {
      const parentShape = parentNode.shape;
      const availableShapes = gameSettings.shapes.filter(
        (shape) => shape !== parentShape,
      );
      newNode.shape = availableShapes[random(0, availableShapes.length - 1)];
    } else {
      const parentColor = parentNode.color;
      const availableColors = gameSettings.colors.filter(
        (color) => color !== parentColor,
      );
      newNode.color = availableColors[random(0, availableColors.length - 1)];
    }

    path.push(newNode);
    visitedNodes.push(newNode);

    return this._generatePath(gameSettings, newNode, path, visitedNodes);
  }

  private _parseDifficulty(
    difficulty_str: string | null | undefined,
  ): TDifficultyValues {
    if (
      typeof difficulty_str === "undefined" ||
      difficulty_str === null ||
      typeof difficulty_str !== "string"
    ) {
      return DEFAULT_DIFFICULTY;
    }

    const difficulty = parseInt(difficulty_str, 10) as TDifficultyValues;
    const isValidDifficulty = Object.values(DIFFICULTY).includes(difficulty);
    if (!isValidDifficulty) {
      return DEFAULT_DIFFICULTY;
    }

    return difficulty;
  }
}

export const gameStore = new GameStore();
export const GameStoreContext = createContext(gameStore);
export const useGameStore = () => useContext(GameStoreContext);
