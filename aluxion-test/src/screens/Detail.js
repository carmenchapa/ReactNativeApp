import React from "react"
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import Images from "../Images"
import {LinearGradient} from "expo-linear-gradient"

export default class DetailScreen extends React.Component {
  state = {
    infoVisible: false,
    image: this.props.navigation.state.params.image
  }

  componentDidMount() {
    this.setState({image: this.props.navigation.state.params.image})
  }

  getPhotoTitle = item => {
    return item.description ? item.description : item.alt_description
  }
  render() {
    console.log(this.state.image)
    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => this.setState({infoVisible: true})}
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
            style={[
              {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "100%",
                width: "100%"
              }
            ]}
          />

          {this.state.infoVisible && (
            <View style={styles.info}>
              <Text style={styles.photoTitle}>
                {this.getPhotoTitle(this.state.image)}
              </Text>
              <Text
                style={styles.votos}
              >{`${this.state.image.likes} votos`}</Text>
							<TouchableOpacity style={{ flexDirection: 'row'}}>
								<Image source={{uri: }}/>
	              <Text
	                style={styles.userName}
	              >{`${this.state.image.user.first_name} ${this.state.image.user.last_name}`}</Text>
							</TouchableOpacity>
            </View>
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
    )
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
    color: "#fff"
  },
  votos: {
    fontFamily: "MuseoLight",
    fontSize: 14,
    lineHeight: 16,
    color: "#fff"
  }
})
