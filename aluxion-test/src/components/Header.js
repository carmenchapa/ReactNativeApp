import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Images from "../Images";
import { styles as s } from "../Styles";

export default class Header extends React.Component {
  render() {
    return (
      <View style={s.headerContainer}>
        {this.props.icon == "menu" ? (
          <View style={s.iconsContainer}>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Image source={Images[this.props.icon]} />
            </TouchableOpacity>
            <Text style={s.pageTitle}>Discover</Text>
            <View style={{ width: 25 }} />
          </View>
        ) : (
          <View style={s.iconsContainer}>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Image source={Images[this.props.icon]} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
