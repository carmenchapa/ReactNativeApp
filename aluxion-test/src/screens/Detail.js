import React from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Images from "../Images";
import { LinearGradient } from "expo-linear-gradient";
import { getFullName, getPhotoTitle } from "../helperFunctions";
import { styles as s } from "../Styles";

opacityMin = 0;
translateYMin = 300;

export default class DetailScreen extends React.Component {
  state = {
    infoVisible: false,
    image: this.props.navigation.state.params.image,
    opacityValue: new Animated.Value(opacityMin),
    translateXValue: new Animated.Value(translateYMin)
  };

  componentDidMount() {
    this.setState({ image: this.props.navigation.state.params.image });
  }

  show(props) {
    this.setState({ infoVisible: true });
    Animated.parallel([
      Animated.timing(this.state.opacityValue, { toValue: 1 }),
      Animated.timing(this.state.translateXValue, { toValue: 0 })
    ]).start();
  }

  render() {
    const animatedStyle = {
      opacity: this.state.opacityValue,
      transform: [{ translateX: this.state.translateXValue }]
    };

    console.log(this.state.image);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ flex: 1 }}
        onPress={() => this.show()}
      >
        <ImageBackground
          style={s.endContainer}
          source={{
            uri: this.state.image.urls.regular
          }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            start={[0.5, 0.7]}
            style={[s.gradient, s.fullFill]}
          />

          {this.state.infoVisible && (
            <Animated.View style={[s.detailInfo, animatedStyle]}>
              <Text style={s.detailPhotoTitle}>
                {getPhotoTitle(this.state.image)}
              </Text>
              <Text
                style={s.detailLikes}
              >{`${this.state.image.likes} likes`}</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingTop: 26,
                  marginBottom: 30
                }}
              >
                <Image
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  source={{ uri: this.state.image.user.profile_image.small }}
                />
                <View style={{ paddingLeft: 8, justifyContent: "center" }}>
                  <Text style={s.detailUserName}>
                    {getFullName(this.state.image.user)}
                  </Text>
                  <Text style={s.viewProfile}>View profile</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          <View style={s.headerContainer}>
            <View style={s.iconsContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={Images.closeWhite} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
