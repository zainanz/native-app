import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
export default function MainContent() {
  const [currentMood, setCurrentMood] = useState<React.JSX.Element>(
    <FontAwesome5 name="meh-rolling-eyes" size={70} color="orange" />
  );
  const [satisfied, setSatisfied] = useState(false);
  const [searching, setSearching] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text>{currentMood}</Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.heading}>Boooored?</Text>
        <Text style={styles.subheading}>
          Roll the spinner to generate a random task
        </Text>
        <View style={styles.generateDiv}>
          {
            <Text style={searching ? styles.visible : styles.invisible}>
              <FontAwesome5 name="spinner" size={30} color="black" />
            </Text>
          }
          <Pressable>
            <Text>Get a random task</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  invisible: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  generateDiv: {
    marginTop: 30,
    alignItems: "center",
  },
  status: {
    backgroundColor: "#DDD",
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    color: "#222",
  },
  subheading: {
    fontSize: 15,
    color: "#333",
    flexDirection: "column",
  },
});
