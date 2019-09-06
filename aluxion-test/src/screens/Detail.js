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
import { SCREEN_WIDTH } from "../Constants";

const opacityMin = 0;
const translateYMin = 60;

const ImageDetail = props => {
  const { infoVisible, currentImage, goToProfile } = props;
  const animatedStyle = {
    opacity: props.opacityValue,
    transform: [{ translateY: props.translateYValue }]
  };
  return (
    <View style={s.flx1}>
      <ImageBackground
        style={[s.flx1, s.endContent, { resizeMode: "cover" }]}
        source={{ uri: currentImage.urls.regular }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          start={[0.5, 0.7]}
          style={[s.absoluteTop, s.fullFill]}
        />

        {infoVisible && (
          <ImageInfo
            image={currentImage}
            animatedStyle={animatedStyle}
            goProfile={() => goToProfile(currentImage)}
          />
        )}

        <TouchableOpacity
          style={s.profileTouchable}
          activeOpacity={0.9}
          onPress={() => props.show()}
        >
          <View style={s.flx1} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const ImageInfo = props => (
  <Animated.View style={[s.detailInfo, props.animatedStyle]}>
    <Text style={s.detailPhotoTitle}>{getPhotoTitle(props.image)}</Text>
    <Text style={s.detailLikes}>{`${props.image.likes} likes`}</Text>
    <TouchableOpacity
      style={s.profileContainer}
      onPress={() => props.goProfile()}
    >
      <Image
        style={s.userImage}
        source={{
          uri: props.image.user.profile_image.medium
        }}
      />
      <View style={{ paddingLeft: 8, justifyContent: "center" }}>
        <Text style={s.detailUserName}>{props.image.user.name}</Text>
        <Text style={s.viewProfile}>View profile</Text>
      </View>
    </TouchableOpacity>
  </Animated.View>
);

class DetailScreen extends React.Component {
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

  goToProfile = item => {
    this.hide(() => this.props.navigation.navigate("Profile", { item }));
  };

  componentDidMount() {
    const { index } = this.props.navigation.state.params;
    this.setState({ currentIndex: index });
    this.flatListRef.scrollToIndex({
      index: index,
      animated: false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.navigation.state.params.index !==
      this.props.navigation.state.params.index
    ) {
      const { index } = this.props.navigation.state.params;
      this.setState({ currentIndex: index });
      this.flatListRef.scrollToIndex({
        index: index,
        animated: false
      });
    }
  }

  render() {
    const { navigation, images, profileImages } = this.props;
    const {
      infoVisible,
      opacityValue,
      translateYValue,
      currentIndex
    } = this.state;
    const data =
      navigation.state.params.data === "random"
        ? images.images
        : profileImages.profileImages;
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
                currentImage={item}
                goToProfile={() => this.goToProfile(item)}
                show={this.show}
                infoVisible={infoVisible}
                opacityValue={opacityValue}
                translateYValue={translateYValue}
              />
            </View>
          )}
          horizontal
          initialScrollIndex={currentIndex}
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
