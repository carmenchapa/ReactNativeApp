import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import FeeScreen from "./screens/Fee";
import DetailScreen from "./screens/Detail";
import ProfileScreen from "./screens/Profile";

const RootNavigator = createDrawerNavigator(
  {
    Fee: {
      screen: FeeScreen,

      navigationOptions: ({ navigation }) => ({
        title: `Fee`
        // drawerLabel: () => null
      })
    },
    Detail: {
      screen: DetailScreen,

      navigationOptions: ({ navigation }) => ({
        title: `Detail`,
        drawerLabel: () => null
      })
    },
    Profile: {
      screen: ProfileScreen,

      navigationOptions: ({ navigation }) => ({
        title: `Profile`,
        drawerLabel: () => null
      })
    }
  },
  {
    initialRouteName: "Fee",
    headerMode: "none",
    cardStyle: { backgroundColor: "#fff" }
  }
);

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
