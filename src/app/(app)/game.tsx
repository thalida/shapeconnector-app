import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { Box, Text } from "@/components";

export default function IndexScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Game</Text>
      <Link href="/">Index</Link>
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
