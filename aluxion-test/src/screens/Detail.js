import React from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  ImageBackground,
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
  goProfile(image) {
    this.props.goToProfile();
  }

  render() {
    const { infoVisible } = this.props;
    const animatedStyle = {
      opacity: this.props.opacityValue,
      transform: [{ translateY: this.props.translateYValue }]
    };
    return (
      <View style={s.flx1}>
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
            onPress={() => this.props.show()}
          >
            <View style={s.flx1} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  position = new Animated.ValueXY();
  state = {
    currentIndex: this.props.navigation.state.params.index,
    infoVisible: false,
    opacityValue: new Animated.Value(opacityMin),
    translateYValue: new Animated.Value(translateYMin)
  };

  show = () => {
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
  };

  hide = func => {
    Animated.parallel([
      Animated.timing(this.state.opacityValue, { toValue: opacityMin }),
      Animated.timing(this.state.translateYValue, {
        toValue: translateYMin,
        duration: 0
      })
    ]).start(func);
    this.setState({ infoVisible: false });
  };

  close() {
    this.hide(() => this.props.navigation.goBack());
  }

  componentDidMount() {
    console.log(
      "index",
      this.props.navigation.state.params.index,
      this.state.currentIndex
    );
    this.setState({ currentIndex: this.props.navigation.state.params.index });
    this.flatListRef.scrollToIndex({
      index: this.props.navigation.state.params.index,
      animated: false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.navigation.state.params.index !==
      this.props.navigation.state.params.index
    ) {
      this.setState({ currentIndex: this.props.navigation.state.params.index });
      this.flatListRef.scrollToIndex({
        index: this.props.navigation.state.params.index,
        animated: false
      });
    }
  }

  render() {
    console.log("render", this.state.infoVisible);
    const data =
      this.props.navigation.state.params.data === "random"
        ? this.props.images.images
        : this.props.profileImages.profileImages;
    return (
      <View style={s.flx1}>
        <FlatList
          ref={ref => (this.flatListRef = ref)}
          data={data}
          pagingEnabled
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <View style={s.fullFill}>
              <ImageDetail
                ref={ref => (this.ImageDetailtRef = ref)}
                closed={this.state.closed}
                currentImage={item}
                goToProfile={() =>
                  this.hide(() =>
                    this.props.navigation.navigate("Profile", { item: item })
                  )
                }
                // hide={func => this.hide(func)}
                show={this.show}
                infoVisible={this.state.infoVisible}
                opacityValue={this.state.opacityValue}
                translateYValue={this.state.translateYValue}
              />
            </View>
          )}
          horizontal
          initialScrollIndex={this.state.currentIndex}
          getItemLayout={(data, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index
          })}
          decelerationRate="fast"
        />
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
