import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { getPhotoTitle } from "../helperFunctions";
import { styles as s } from "../Styles";
import { ImageListItem } from "../components/ImageList";
import Unsplash from "unsplash-js/native";

const accesKey =
  "a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa";
const secretKey =
  "4ea19af370997bcb0c580c071437661346b073b8e2f5252871e171ecc3c783ee";

const unsplash = new Unsplash({
  applicationId: accesKey,
  secret: secretKey
});

export default class ProfileScreen extends React.Component {
  state = {
    imgs: []
  };

  loadData() {
    const userName = this.props.navigation.state.params.item.user.username;
    console.log(userName);
    unsplash.users
      .photos(userName, 1, 10)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.setState({ imgs: data });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
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
          ref={ref => {
            this.flatListRef = ref;
          }}
          numColumns={2}
          data={this.state.imgs}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <ImageListItem
              item={item}
              index={index}
              navigate={() => navigation.navigate("Detail", { image: item })}
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
