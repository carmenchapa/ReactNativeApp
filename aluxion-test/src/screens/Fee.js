import React from "react";
import { Animated, FlatList, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRandomImages, imgsReducer } from "../redux/store";
import Header from "../components/Header";
import { ImageListItem } from "../components/ImageList";
import { styles as s } from "../Styles";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } from "../Constants";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FeeScreen extends React.Component {
  scrollAnim = new Animated.Value(0);
  offsetAnim = new Animated.Value(0);
  state = {
    scrollAnim: this.scrollAnim,
    offsetAnim: this.offsetAnim,
    clampedScroll: Animated.diffClamp(
      Animated.add(
        this.scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp"
        }),
        this.offsetAnim
      ),
      0,
      NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
    )
  };

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
    this.props.getImages();

    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
        ? this._offsetValue + NAVBAR_HEIGHT
        : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };

  render() {
    // console.log("props.images", this.props.images, this.props.images != null);
    const { navigation } = this.props;
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: "clamp"
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    console.log(" navbarTranslate", navbarTranslate);
    return (
      <View style={[s.flx1, s.centerContent]}>
        <AnimatedFlatList
          numColumns={2}
          data={this.props.images.images}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <ImageListItem
              item={item}
              index={index}
              navigate={() =>
                navigation.navigate("Detail", { data: "random", index: index })
              }
            />
          )}
          columnWrapperStyle={s.columnWrapperStyle}
          contentContainerStyle={{
            marginTop: hp("14%"),
            paddingTop: 10,
            marginHorizontal: 26
          }}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true }
          )}
        />

        <Header
          icon="menu"
          onPress={() => navigation.openDrawer()}
          extraStyles={[
            s.header,
            { transform: [{ translateY: navbarTranslate }] }
          ]}
          opacity={{ opacity: navbarOpacity }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { images } = state;
  return { images };
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
)(FeeScreen);
