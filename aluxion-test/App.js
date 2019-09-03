import React from "react"
import {StyleSheet, Text, View} from "react-native"
import AppContainer from "./src/Navigator"

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar
        backgroundColor={s.smoke_white.color}
        barStyle="dark-content"
      /> */}
      <AppContainer uriPrefix="/app" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
