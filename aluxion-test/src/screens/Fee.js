import React from "react"
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import Images from "../Images"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import {LinearGradient} from "expo-linear-gradient"
import Unsplash from "unsplash-js/native"

const accesKey =
  "a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa"
const secretKey =
  "4ea19af370997bcb0c580c071437661346b073b8e2f5252871e171ecc3c783ee"

const unsplash = new Unsplash({
  applicationId: accesKey,
  secret: secretKey
})

export default class FeeScreen extends React.Component {
  state = {
    imgs: []
  }
  componentDidMount() {
    unsplash.photos
      .listPhotos(Math.floor(Math.random() * 100), 16, "random")
      .then(res => res.json())
      .then(data => {
        this.setState({imgs: data})
      })
      .catch(err => {
        console.log("Error happened during fetching!", err)
      })
  }

  isOdd = num => num % 2

  renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate("Detail", {image: item})}
    >
      <ImageBackground
        style={[
          styles.listItem,
          this.isOdd(index) ? {marginTop: 26} : {marginBottom: 26},
          {justifyContent: "flex-end", padding: 10, overflow: "hidden"}
        ]}
        imageStyle={{borderRadius: 10}}
        source={{
          uri: item.urls.small
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          start={[0.5, 0.7]}
          style={[
            styles.listItem,
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0
            }
          ]}
        />
        <Text
          style={styles.userName}
        >{`${item.user.first_name} ${item.user.last_name}`}</Text>
        <Text style={styles.votos}>{`${item.likes} votos`}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )

  render() {
    // this.state.imgs && console.log(this.state.imgs)
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={this.state.imgs}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          columnWrapperStyle={{flex: 1, justifyContent: "space-between"}}
          contentContainerStyle={{
            marginTop: 120,
            marginHorizontal: 26
          }}
        />

        <View style={styles.headerContainer}>
          <View style={styles.iconsContainer}>
            <Image source={Images.menu} />
            <Text style={styles.title}>Discover</Text>
            <View style={{width: 25}} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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
  title: {
    fontFamily: "MuseoBlack",
    fontSize: 24,
    lineHeight: 28
  },
  listItem: {
    width: wp("40%"),
    height: wp("55%"),
    borderRadius: 10
  },
  userName: {
    fontFamily: "MuseoMedium",
    fontSize: 12,
    lineHeight: 14,
    color: "#fff"
  },
  votos: {
    fontFamily: "MuseoLight",
    fontSize: 8,
    lineHeight: 9,
    color: "#fff"
  }
})
