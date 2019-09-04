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
          style={styles.container}
          source={{
            uri: this.state.image.urls.regular
          }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            start={[0.5, 0.7]}
            style={styles.gradient}
          />

          {this.state.infoVisible && (
            <Animated.View style={[styles.info, animatedStyle]}>
              <Text style={styles.photoTitle}>
                {getPhotoTitle(this.state.image)}
              </Text>
              <Text
                style={styles.likes}
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
                  <Text style={styles.userName}>
                    {getFullName(this.state.image.user)}
                  </Text>
                  <Text style={styles.viewProfile}>View profile</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          <View style={styles.headerContainer}>
            <View style={styles.iconsContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-end"
    // padding: 26
  },
  headerContainer: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    marginLeft: 26,
    marginRight: 26,
    paddingVertical: 26
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  info: {
    padding: 26
  },
  photoTitle: {
    fontFamily: "MuseoMedium",
    fontSize: 42,
    lineHeight: 49,
    color: "#fff"
  },
  userName: {
    fontFamily: "MuseoMedium",
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 8,
    color: "#fff"
  },
  viewProfile: {
    fontFamily: "MuseoRegular",
    fontSize: 10,
    lineHeight: 12,
    color: "#fff"
  },
  likes: {
    fontFamily: "MuseoLight",
    fontSize: 14,
    lineHeight: 16,
    color: "#fff"
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%"
  }
});
