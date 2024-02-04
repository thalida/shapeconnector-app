import { parse } from "@babel/core";
import {
  useLocalSearchParams,
  router,
  useRootNavigationState,
} from "expo-router";
import { observer } from "mobx-react";
import { useEffect, useMemo, useState } from "react";

import { Game } from "@/components/Game";
import { Box } from "@/components/ui";
import { useGameStore } from "@/stores/game";
import {
  DEFAULT_DIFFICULTY,
  DIFFICULTY,
  TDifficultyKeys,
  TDifficultyValues,
} from "@/types/game";

const PlayScreen = observer(() => {
  const rootNavigationState = useRootNavigationState();
  const gameStore = useGameStore();
  const [isReady, setIsReady] = useState(false);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const params = useLocalSearchParams<{
    game?: string;
    difficulty?: string;
  }>();

  useEffect(() => {
    const hasKey = rootNavigationState
      ? typeof rootNavigationState.key === "string"
      : false;

    setIsNavigationReady(hasKey);
  }, [rootNavigationState?.key]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    try {
      gameStore.setupGame(params.game, params.difficulty);
      setIsReady(true);
      console.log("Game is ready", gameStore.game);
    } catch (error) {
      console.error(error);
      router.replace("/");
    }
  }, [isNavigationReady]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    if (
      typeof gameStore.game === "undefined" ||
      gameStore.game === null ||
      typeof gameStore.encodedGame === "undefined" ||
      gameStore.encodedGame === null ||
      gameStore.encodedGame.length === 0
    ) {
      return;
    }

    router.setParams({
      game: gameStore.encodedGame,
      difficulty: `${gameStore.game.settings.difficulty}`,
    });
  }, [isNavigationReady, gameStore.game, gameStore.encodedGame]);

  return (
    <Box>
      <Game />
    </Box>
  );
});

export default PlayScreen;
