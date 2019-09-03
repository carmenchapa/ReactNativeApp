import React from "react"
import {StyleSheet, Text, View, Image} from "react-native"

export default class FeeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.iconsContainer}>
            <Image
              source={require("../../Resources/icons/ic_close/ic_close_black.png")}
            />
          </View>
        </View>
        <Text>FeeScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 20
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
