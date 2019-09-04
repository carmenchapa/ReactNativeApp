import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Images from "../Images";
import { LinearGradient } from "expo-linear-gradient";
import Unsplash from "unsplash-js/native";
import { getPhotoTitle } from "../helperFunctions";
import { styles as s } from "../Styles";
import Header from "../components/Header";
import { ImageListItem } from "../components/ImageList";

const accesKey =
  "a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa";
const secretKey =
  "4ea19af370997bcb0c580c071437661346b073b8e2f5252871e171ecc3c783ee";

const unsplash = new Unsplash({
  applicationId: accesKey,
  secret: secretKey
});

export default class FeeScreen extends React.Component {
  state = {
    imgs: []
  };
  componentDidMount() {
    unsplash.photos
      .listPhotos(Math.floor(Math.random() * 100), 16, "random")
      .then(res => res.json())
      .then(data => {
        this.setState({ imgs: data });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  }

  // isOdd = num => num % 2;

  // renderItem = ({ item, index, navigate }) => (
  //   <TouchableOpacity
  //     onPress={() => this.props.navigation.navigate("Detail", { image: item })}
  //     // onPress={() => navigate()}
  //   >
  //     <ImageBackground
  //       style={[
  //         s.listItem,
  //         this.isOdd(index) ? { marginTop: 26 } : { marginBottom: 26 },
  //         s.feeImageBackground
  //       ]}
  //       imageStyle={{ borderRadius: 10 }}
  //       source={{
  //         uri: item.urls.small
  //       }}
  //     >
  //       <LinearGradient
  //         colors={["transparent", "rgba(0,0,0,0.9)"]}
  //         start={[0.5, 0.7]}
  //         style={[s.listItem, s.gradient]}
  //       />
  //       <Text style={s.feePhotoTitle}>{getPhotoTitle(item)}</Text>
  //       <Text style={s.feeLikes}>{`${item.likes} likes`}</Text>
  //     </ImageBackground>
  //   </TouchableOpacity>
  // );

  render() {
    const { navigation } = this.props;
    return (
      <View style={s.container}>
        <FlatList
          numColumns={2}
          data={this.state.imgs}
          keyExtractor={(item, index) => item + index}
          // renderItem={this.renderItem}
          renderItem={({ item, index }) => (
            <ImageListItem
              item={item}
              index={index}
              navigate={() => navigation.navigate("Detail", { image: item })}
            />
          )}
          columnWrapperStyle={s.columnWrapperStyle}
          contentContainerStyle={{
            marginTop: 120,
            marginHorizontal: 26
          }}
        />

        <Header icon="menu" onPress={() => navigation.openDrawer()} />

        {/* <View style={s.headerContainer}>
          <View style={s.iconsContainer}>
            <Image source={Images.menu} />
            <Text style={s.pageTitle}>Discover</Text>
            <View style={{ width: 25 }} />
          </View>
        </View> */}
      </View>
    );
  }
}
