import React from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Images from "../Images";
import { LinearGradient } from "expo-linear-gradient";
import { getFullName, getPhotoTitle } from "../helperFunctions";
import { styles as s } from "../Styles";
import Header from "../components/Header";

const opacityMin = 0;
const translateYMin = 300;

export default class DetailScreen extends React.Component {
  state = {
    infoVisible: false,
    opacityValue: new Animated.Value(opacityMin),
    translateXValue: new Animated.Value(translateYMin)
  };

  show(props) {
    this.setState({ infoVisible: true });
    Animated.parallel([
      Animated.timing(this.state.opacityValue, { toValue: 1 }),
      Animated.timing(this.state.translateXValue, { toValue: 0 })
    ]).start();
  }

  hide(props) {
    Animated.parallel([
      Animated.timing(this.state.opacityValue, { toValue: 0 }),
      Animated.timing(this.state.translateXValue, {
        toValue: translateYMin,
        duration: 0
      })
    ]).start();
    this.setState({ infoVisible: false });
  }

  goProfile(image) {
    this.props.navigation.navigate("Profile", { item: image });
    this.hide();
  }

  close(image) {
    this.hide();
    this.props.navigation.goBack();
  }

  render() {
    const { image } = this.props.navigation.state.params;
    const { infoVisible } = this.state;
    const animatedStyle = {
      opacity: this.state.opacityValue,
      transform: [{ translateX: this.state.translateXValue }]
    };

    console.log(image);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ flex: 1 }}
        onPress={() => this.show()}
      >
        <ImageBackground
          style={[s.container, s.endContent]}
          source={{ uri: image.urls.regular }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            start={[0.5, 0.7]}
            style={[s.gradient, s.fullFill]}
          />

          {infoVisible && (
            <Animated.View style={[s.detailInfo, animatedStyle]}>
              <Text style={s.detailPhotoTitle}>{getPhotoTitle(image)}</Text>
              <Text style={s.detailLikes}>{`${image.likes} likes`}</Text>
              <TouchableOpacity
                style={s.profileContainer}
                onPress={() => this.goProfile(image)}
              >
                <Image
                  style={s.userImage}
                  source={{ uri: image.user.profile_image.medium }}
                />
                <View style={{ paddingLeft: 8, justifyContent: "center" }}>
                  <Text style={s.detailUserName}>
                    {getFullName(image.user)}
                  </Text>
                  <Text style={s.viewProfile}>View profile</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          <Header icon="closeWhite" onPress={() => this.close()} />
          {/* <View style={s.headerContainer}>
            <View style={s.iconsContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={Images.closeWhite} />
              </TouchableOpacity>
            </View>
          </View> */}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
