import React from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  PanResponder,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRandomImages, imgsReducer } from "../redux/store";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import { getPhotoTitle } from "../helperFunctions";
import { styles as s } from "../Styles";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../Constants";

const opacityMin = 0;
const translateYMin = 60;

class ImageDetail extends React.Component {
  state = {
    // currentIndex: this.props.navigation.state.params.index,
    infoVisible: false,
    opacityValue: new Animated.Value(opacityMin),
    translateYValue: new Animated.Value(translateYMin)
  };

  show(props) {
    console.log("show");
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
    this.props.goToProfile();
    // this.props.navigation.navigate("Profile", { item: image });
    this.hide();
  }

  // close(image) {
  //   this.hide();
  //   this.props.navigation.goBack();
  // }

  render() {
    const { infoVisible } = this.state;
    const animatedStyle = {
      opacity: this.state.opacityValue,
      transform: [{ translateY: this.state.translateYValue }]
    };

    return (
      <ImageBackground
        style={[s.flx1, s.endContent, { resizeMode: "cover" }]}
        source={{ uri: this.props.currentImage.urls.regular }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          start={[0.5, 0.7]}
          style={[s.absoluteTop, s.fullFill]}
        />

        {infoVisible && (
          <Animated.View style={[s.detailInfo, animatedStyle]}>
            <Text style={s.detailPhotoTitle}>
              {getPhotoTitle(this.props.currentImage)}
            </Text>
            <Text
              style={s.detailLikes}
            >{`${this.props.currentImage.likes} likes`}</Text>
            <TouchableOpacity
              style={s.profileContainer}
              onPress={() => this.goProfile(this.props.currentImage)}
            >
              <Image
                style={s.userImage}
                source={{
                  uri: this.props.currentImage.user.profile_image.medium
                }}
              />
              <View style={{ paddingLeft: 8, justifyContent: "center" }}>
                <Text style={s.detailUserName}>
                  {this.props.currentImage.user.name}
                </Text>
                <Text style={s.viewProfile}>View profile</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        <TouchableOpacity
          style={s.profileTouchable}
          activeOpacity={0.9}
          onPress={() => this.show()}
        >
          <View style={s.flx1} />
        </TouchableOpacity>

        {/* <Header
          icon="closeWhite"
          onPress={() => this.close()}
          extraStyles={s.header}
        /> */}
      </ImageBackground>
    );
  }
}

class DetailScreen extends React.Component {
  position = new Animated.ValueXY();
  state = {
    currentIndex: this.props.navigation.state.params.index
  };

  rotate = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-4deg", "0deg", "4deg"],
    extrapolate: "clamp"
  });

  rotateAndTranslate = {
    transform: [
      { rotate: this.rotate },
      ...this.position.getTranslateTransform()
    ]
  };

  nextCardOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp"
  });
  nextCardScale = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp"
  });

  close(image) {
    // this.hide();
    this.props.navigation.goBack();
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          console.log(">120");
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          console.log("<120");
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex - 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          console.log("else");
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  renderImages = () => {
    return this.props.images.images
      .map((item, i) => {
        // if (i < this.state.currentIndex) {
        //   return null;
        // } else
        if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={i}
              style={[
                this.rotateAndTranslate,
                s.fullFill,
                { position: "absolute" }
              ]}
            >
              <ImageDetail
                currentImage={item}
                goToProfile={() =>
                  this.props.navigation.navigate("Profile", { item: item })
                }
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={i}
              style={[
                s.fullFill,
                {
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }]
                }
              ]}
            >
              <ImageBackground
                style={[s.flx1, s.endContent, { resizeMode: "cover" }]}
                source={{ uri: item.urls.regular }}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    return (
      <View style={s.flx1}>
        {this.renderImages()}
        <Header
          icon="closeWhite"
          onPress={() => this.close()}
          extraStyles={s.header}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { images, profileImages } = state;
  return { images, profileImages };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getImages: getRandomImages,
      imgsReducer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
