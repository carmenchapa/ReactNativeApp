import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfileImages, profileImgsReducer } from "../redux/store";
import Header from "../components/Header";
import { ImageListItem } from "../components/ImageList";
import { styles as s } from "../Styles";

class ProfileScreen extends React.Component {
  state = {
    imgs: []
  };

  loadData() {
    const userName = this.props.navigation.state.params.item.user.username;
    this.props.getProfileImages(userName);
  }

  close = () => {
    this.props.navigation.goBack(null);
    this.flatListRef.scrollToIndex({ index: 0 });
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.navigation.state.params.item.user.name !==
      this.props.navigation.state.params.item.user.name
    ) {
      this.loadData();
    }
  }

  render() {
    const { navigation } = this.props;
    const { item } = navigation.state.params;
    return (
      <View style={(s.flx1, s.startContent)}>
        <ProfileHeader
          image={item.user.profile_image.medium}
          name={item.user.name}
          bio={item.user.bio}
        />

        <FlatList
          ref={ref => (this.flatListRef = ref)}
          numColumns={2}
          data={this.props.profileImages.profileImages}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <ImageListItem
              item={item}
              index={index}
              navigate={() =>
                navigation.navigate("Detail", { data: "profile", index: index })
              }
            />
          )}
          columnWrapperStyle={s.columnWrapperStyle}
          contentContainerStyle={{
            marginHorizontal: 26
          }}
        />

        <Header
          icon="close"
          onPress={() => this.close()}
          extraStyles={s.header}
        />
      </View>
    );
  }
}

const ProfileHeader = props => (
  <View style={[s.profileContainer, s.profileHeader]}>
    <Image style={s.profileImage} source={{ uri: props.image }} />
    <View style={{ paddingLeft: 12, justifyContent: "center" }}>
      <Text style={s.profileUserName}>{props.name}</Text>
      <View style={s.profileDescription}>
        <Text style={s.profileDescription}>{props.bio}</Text>
      </View>
    </View>
  </View>
);

const mapStateToProps = state => {
  const { profileImages } = state;
  return { profileImages };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProfileImages,
      profileImgsReducer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
