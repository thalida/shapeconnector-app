import {
  useLocalSearchParams,
  router,
  useRootNavigationState,
  Link,
} from "expo-router";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameBoard } from "@/components/GameBoard";
import { GameScore } from "@/components/GameScore";
import { Box, Text } from "@/components/ui";
import { useGameStore } from "@/stores/game";

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
    <SafeAreaView
      style={{
        backgroundColor: "#111",
        height: "100%",
      }}
    >
      {isReady ? null : <Text>Loading...</Text>}
      {isReady && gameStore.game !== null && (
        <Box>
          <Link href="/">Back</Link>
          <GameScore gameBoard={gameStore.game} />
          <GameBoard gameBoard={gameStore.game} />
        </Box>
      )}
    </SafeAreaView>
  );
});

export default PlayScreen;
