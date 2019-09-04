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
    const { image, infoVisible } = this.state;
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
          style={s.endContainer}
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
              <TouchableOpacity style={s.profileContainer}>
                <Image
                  style={s.profileImage}
                  source={{ uri: image.user.profile_image.small }}
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

          <Header
            icon="closeWhite"
            onPress={() => this.props.navigation.goBack()}
          />
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
