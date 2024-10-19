// import User from "./Screens/user";
import MainContent from "./Screens/maincontent";
// import { Provider } from "react-redux";
// import store from "../store/store";
// import { createStackNavigator } from "@react-navigation/stack";
// import "react-native-gesture-handler";

// export type NavigationPropsType = {
//   User: undefined; // No parameters for User screen
//   MainContent: undefined; // Parameters for Details screen
// };

export default function Index() {
  // const Stack = createStackNavigator();
  return (
    <MainContent />
    // <Provider store={store}>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //   >
    //     <Stack.Screen name="User" component={User} />
    //     <Stack.Screen name="MainContent" component={MainContent} />
    //   </Stack.Navigator>
    // </Provider>
  );
}
