import React from "react"
import {FlatList, Image, StyleSheet, Text, View} from "react-native"
import Images from "../Images"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"

export default class FeeScreen extends React.Component {
  // componentDidMount() {
  //   fetch("https://api.unsplash.com/photos/?client_id=" + cred.APP_ID)
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({imgs: data})
  //     })
  //     .catch(err => {
  //       console.log("Error happened during fetching!", err)
  //     })
  // }

  isOdd = num => num % 2

  renderItem = ({item}) => (
    <View
      style={[
        styles.listItem,
        this.isOdd(item) ? {marginTop: 26} : {marginBottom: 26}
      ]}
    >
      <Text>{item}</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={[0, 1, 2, 3, 4, 5, 6, 7]}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          columnWrapperStyle={{flex: 1, justifyContent: "space-between"}}
          contentContainerStyle={{
            marginTop: 120,
            marginHorizontal: 26
          }}
          // contentOffset={{x: 0, y: -140}}
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
    // alignItems: "center",
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
    // marginHorizontal: 10,
    backgroundColor: "orange",
    borderRadius: 10
  }
})
