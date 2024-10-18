import GetUser from "./getname";
import { Provider } from "react-redux";
import store from "../store/store";
export default function Index() {
  return (
    <Provider store={store}>
      <GetUser />
    </Provider>
  );
}
