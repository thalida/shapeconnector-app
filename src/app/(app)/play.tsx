import {
  useLocalSearchParams,
  router,
  useRootNavigationState,
} from "expo-router";
import { observer } from "mobx-react";
import { useEffect } from "react";

import { Game } from "@/components/Game";
import { Box } from "@/components/ui";
import { useGameStore } from "@/stores/game";
import { DEFAULT_DIFFICULTY, DIFFICULTY, TDifficultyKeys } from "@/types/game";

const PlayScreen = observer(() => {
  const rootNavigationState = useRootNavigationState();
  const gameStore = useGameStore();
  const params = useLocalSearchParams<{
    game?: string;
    difficulty?: TDifficultyKeys;
  }>();

  useEffect(() => {
    const difficulty = params.difficulty
      ? DIFFICULTY[params.difficulty]
      : DEFAULT_DIFFICULTY;

    if (typeof params.game == "string" && params.game.length > 0) {
      gameStore.decodeGame(params.game);
      return;
    }

    gameStore.createGame(difficulty);
  }, []);

  useEffect(() => {
    if (!rootNavigationState?.key) {
      return;
    }

    if (
      typeof gameStore.encodedGame === "undefined" ||
      gameStore.encodedGame === null
    ) {
      return;
    }

    router.setParams({ game: gameStore.encodedGame });
  }, [rootNavigationState?.key, gameStore.encodedGame]);

  return (
    <Box>
      <Game />
    </Box>
  );
});

export default PlayScreen;
