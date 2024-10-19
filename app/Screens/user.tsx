import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setuser } from "@/store/userSlice";
import { StackNavigationProp } from "@react-navigation/stack";
// import { NavigationPropsType } from "../index";

type UserProps = StackNavigationProp<NavigationPropsType, "User">;

export default function User({ navigation }: { navigation: UserProps }) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState("");

  const onPressDisplay = () => {
    if (text && text.length > 1) {
      setError("");
      dispatch(setuser(text));
      navigation.navigate("MainContent");
      return setUsername(text);
    } else {
      console.log(text);
      setError(() => "Your nickname cant be blank!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          //   value={text}
          onChangeText={setText}
          placeholder="What is your name?"
        />
        {error ? (
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : (
          <Text></Text>
        )}
        <Pressable
          style={styles.button}
          onPress={onPressDisplay}
          accessibilityLabel="this button sets your username"
        >
          <Text style={styles.buttonText}>Set username</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: 300,
  },
  input: {
    width: "100%",
    paddingLeft: 10,
    marginBottom: 10,
    height: 50,
    borderRadius: 5,
    borderColor: "#888",
    borderWidth: 1,
    borderStyle: "solid",
  },
  button: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 50,
    width: "49%",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 10,
  },
});
