import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import FeeScreen from "./screens/Fee"
import DetailScreen from "./screens/Detail"
import ProfileScreen from "./screens/Profile"

const RootNavigator = createStackNavigator(
  {
    Fee: {
      screen: FeeScreen,

      navigationOptions: ({navigation}) => ({
        title: `Fee`
      })
    },
    Detail: {
      screen: DetailScreen,

      navigationOptions: ({navigation}) => ({
        title: `Detail`
      })
    },
    Profile: {
      screen: ProfileScreen,

      navigationOptions: ({navigation}) => ({
        title: `Profile`
      })
    }
  },
  {
    initialRouteName: "Fee",
    headerMode: "none",
    cardStyle: {backgroundColor: "#fff"}
  }
)

const AppContainer = createAppContainer(RootNavigator)

export default AppContainer
