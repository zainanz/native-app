import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

type DataType = {
  activity: string;
  availability: number;
  type: string;
  participants: number;
  price: number;
  accessibility: string;
  duration: string;
  kidFriendly: boolean;
  link: string;
  key: string;
};

export default function MainContent() {
  const [currentMood, setCurrentMood] = useState<React.JSX.Element>(
    <FontAwesome5 name="meh-rolling-eyes" size={70} color="orange" />
  );
  const [satisfied, setSatisfied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [task, setTask] = useState<DataType | null>(null);

  const onSearch = async () => {
    setSearching(true);
    const res = await fetch("https://bored-api.appbrewery.com/random");
    const data = await res.json();
    setTask(data);
    console.log(data);
    setSearching(false);
  };

  // useEffect ( () => {
  //   if (task){
  //     setCurrentMood( () => )
  //   }
  // }, [task])

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
          <Pressable
            onPress={onSearch}
            style={[styles.orangeButton, styles.button]}
          >
            <Text>Get a random task</Text>
          </Pressable>
          <View style={styles.taskDiv}>
            {task ? (
              <>
                <Text style={styles.taskDivHeading}>{task.activity}</Text>
                <View style={styles.description}>
                  <Text style={styles.taskDivText}>Type:</Text>
                  <Text style={styles.desc}>{task.type}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.taskDivText}>Participants:</Text>
                  <Text style={styles.desc}>{task.participants}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.taskDivText}>Price:</Text>
                  <Text style={styles.desc}>{task.price}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.taskDivText}>Accessibility:</Text>
                  <Text style={styles.desc}>{task.accessibility}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.taskDivText}>Duration:</Text>
                  <Text style={styles.desc}>{task.duration}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.taskDivText}>Kid Friendly:</Text>
                  <Text style={styles.desc}>{task.kidFriendly.toString()}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.taskDivText}>Link:</Text>
                  <Text style={styles.desc}>
                    {task.link ? task.link : "no link"}
                  </Text>
                </View>
                <View style={styles.acceptRejectButton}>
                  <Pressable style={[styles.acceptButton, styles.button]}>
                    <Text style={styles.acceptRejectText}>I will do it</Text>
                  </Pressable>
                  <Pressable style={[styles.rejectButton, styles.button]}>
                    <Text style={styles.acceptRejectText}>Pass</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              !task &&
              searching && (
                <Text>
                  <FontAwesome5 name="spinner" size={30} color="black" />
                </Text>
              )
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  desc: { fontSize: 15, fontWeight: "bold" },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  taskDivHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  taskDivText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#555",
  },
  acceptRejectText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  taskDiv: {
    backgroundColor: "#FFD580",
    borderRadius: 10,
    padding: 10,
    width: "75%",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "lightgreen",
    flex: 1,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  rejectButton: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    backgroundColor: "red",
    flex: 1,
  },
  acceptRejectButton: {
    flexDirection: "row",
    width: "100%",
  },
  orangeButton: {
    backgroundColor: "orange",
  },
  button: {
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
    elevation: 5,
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
