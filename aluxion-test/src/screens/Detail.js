import React from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getPhotoTitle } from "../helperFunctions";
import { styles as s } from "../Styles";
import Header from "../components/Header";

const opacityMin = 0;
const translateYMin = 60;

export default class DetailScreen extends React.Component {
  state = {
    infoVisible: false,
    opacityValue: new Animated.Value(opacityMin),
    translateYValue: new Animated.Value(translateYMin)
  };

  show(props) {
    this.setState({ infoVisible: true });
    Animated.parallel([
      Animated.timing(this.state.opacityValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.in()
      }),
      Animated.timing(this.state.translateYValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.in()
      })
    ]).start();
  }

  hide(props) {
    Animated.parallel([
      Animated.timing(this.state.opacityValue, { toValue: opacityMin }),
      Animated.timing(this.state.translateYValue, {
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
      transform: [{ translateY: this.state.translateYValue }]
    };

    // console.log(image);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ flex: 1 }}
        onPress={() => this.show()}
      >
        <ImageBackground
          style={[s.flx1, s.endContent]}
          source={{ uri: image.urls.regular }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            start={[0.5, 0.7]}
            style={[s.absoluteTop, s.fullFill]}
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
                  <Text style={s.detailUserName}>{image.user.name}</Text>
                  <Text style={s.viewProfile}>View profile</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          <Header
            icon="closeWhite"
            onPress={() => this.close()}
            extraStyles={s.header}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
