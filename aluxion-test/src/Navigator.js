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
        title: `Fee`,
        drawerLabel: "Discover"
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
    gesturesEnabled: false,
    headerMode: "none",
    cardStyle: { backgroundColor: "#fff" },
    contentOptions: {
      activeTintColor: "#000",
      activeBackgroundColor: "#fff",
      labelStyle: { fontFamily: "MuseoBlack", fontSize: 20 }
    }
  }
);

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
