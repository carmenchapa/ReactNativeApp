import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import Images from "../Images";
import { styles as s } from "../Styles";
import { SafeAreaView } from "react-navigation";

export default class Header extends React.Component {
  render() {
    return (
      <Animated.View
        style={[
          s.headerContainer,
          this.props.icon !== "closeWhite" && { backgroundColor: "#fff" },
          this.props.extraStyles
        ]}
      >
        <SafeAreaView>
          {this.props.icon == "menu" ? (
            <View style={s.iconsContainer}>
              <TouchableOpacity onPress={() => this.props.onPress()}>
                <Animated.Image
                  style={this.props.opacity}
                  source={Images[this.props.icon]}
                />
              </TouchableOpacity>
              <Animated.Text style={[s.pageTitle, this.props.opacity]}>
                Discover
              </Animated.Text>
              <View style={{ width: 25 }} />
            </View>
          ) : (
            <View style={s.iconsContainer}>
              <TouchableOpacity onPress={() => this.props.onPress()}>
                <Image source={Images[this.props.icon]} />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Animated.View>
    );
  }
}
