import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import AppContainer from "./src/Navigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Images from "./src/Images";
import store from "./src/redux/store";
import { styles as s } from "./src/Styles";

export default class App extends React.Component {
  state = {
    isReady: false
  };

  _cacheResourcesAsync = () => {
    const asyncTasks = Images.downloadAsync().concat([
      Font.loadAsync({
        MuseoLight: require("./Resources/fonts/MuseoSans-100.otf"),
        MuseoRegular: require("./Resources/fonts/MuseoSans-300.otf"),
        MuseoMedium: require("./Resources/fonts/MuseoSans-500.otf"),
        MuseoBold: require("./Resources/fonts/MuseoSans-700.otf"),
        MuseoBlack: require("./Resources/fonts/MuseoSans-900.otf"),
        MuseoItalicLight: require("./Resources/fonts/MuseoSans-100Italic.otf"),
        MuseoItalicRegular: require("./Resources/fonts/MuseoSans-300Italic.otf"),
        MuseoItalicMedium: require("./Resources/fonts/MuseoSans-500Italic.otf"),
        MuseoItalicBold: require("./Resources/fonts/MuseoSans-700Italic.otf"),
        MuseoItalicBlack: require("./Resources/fonts/MuseoSans-900Italic.otf")
      })
    ]);

    return Promise.all(asyncTasks).catch(error => console.log(error));
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <View style={s.flx1}>
          {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" /> */}
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
