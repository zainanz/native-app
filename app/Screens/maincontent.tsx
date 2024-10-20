import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

type TaskType = {
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
  const [acceptedTask, setAcceptedTask] = useState<TaskType>();
  const [searching, setSearching] = useState(false);
  const [task, setTask] = useState<TaskType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doneMessage, setDoneMessage] = useState("");

  const onAcceptChallenge = () => {
    setCurrentMood(() => (
      <FontAwesome5 name="grin-alt" size={70} color="orange" />
    ));
    setAcceptedTask(() => task!);
  };

  const onSearch = async () => {
    console.log("Pressed");

    setSearching(true);
    const res = await fetch("https://bored-api.appbrewery.com/random");
    if (res.ok) {
      const data = await res.json();
      setError(null);
      setTask(data);
      setCurrentMood(() => (
        <FontAwesome5 name="frown-open" size={70} color="orange" />
      ));
    } else {
      setError(() => "something went wrong! Please try again later.");
      console.log(res);
    }
    setSearching(false);
  };

  const resetTask = () => {
    setCurrentMood(() => (
      <FontAwesome5 name="meh-rolling-eyes" size={70} color="orange" />
    ));
    setAcceptedTask(undefined);
    setTask(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text>{currentMood}</Text>
      </View>
      <View style={!acceptedTask ? styles.main : styles.acceptedMain}>
        {!acceptedTask && <Text style={styles.heading}>Boooored?</Text>}
        {!acceptedTask && (
          <Text style={styles.subheading}>Lets find a challenge for you</Text>
        )}
        <View style={styles.generateDiv}>
          {!acceptedTask && (
            <Pressable
              onPress={onSearch}
              style={[styles.orangeButton, styles.button]}
            >
              <Text>Find a challenge</Text>
            </Pressable>
          )}
          <View style={!acceptedTask ? styles.taskDiv : styles.acceptedTask}>
            {error ? <Text>{error}</Text> : null}
            {doneMessage ? <Text>{doneMessage}</Text> : null}
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
                {acceptedTask && (
                  <View style={styles.acceptRejectButton}>
                    <Pressable
                      onPress={resetTask}
                      style={[styles.acceptButton, styles.button]}
                    >
                      <Text style={styles.acceptRejectText}>Done</Text>
                    </Pressable>
                    <Pressable
                      onPress={resetTask}
                      style={[styles.rejectButton, styles.button]}
                    >
                      <Text style={styles.acceptRejectText}>Give up</Text>
                    </Pressable>
                  </View>
                )}
                {!acceptedTask && (
                  <View style={styles.acceptRejectButton}>
                    <Pressable
                      onPress={onAcceptChallenge}
                      style={[styles.acceptButton, styles.button]}
                    >
                      <Text style={styles.acceptRejectText}>
                        Accept the challenge
                      </Text>
                    </Pressable>
                  </View>
                )}
                {!acceptedTask && (
                  <Text>Not interested? Just find another one</Text>
                )}
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
  acceptedMain: {
    width: "100%",
    height: "100%",
  },
  acceptedTask: {
    padding: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFD580",
  },
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
    zIndex: 500,
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
