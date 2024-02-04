import { Link } from "expo-router";

import { Box, Text } from "@/components";

export default function IndexScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Index</Text>
      <Link href="/game">Game</Link>
      <Link href="/tutorial">Tutorial</Link>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
