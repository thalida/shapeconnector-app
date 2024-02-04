import { Link } from "expo-router";

import { Box, Text } from "@/components";

export default function IndexScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Tutorial</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" /> */}
      <Link href="/">Index</Link>
      <Link href="/game">Game</Link>
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
