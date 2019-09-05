import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getPhotoTitle } from "../helperFunctions";
import { styles as s } from "../Styles";

const isOdd = num => num % 2;

export const ImageListItem = props => {
  return (
    <TouchableOpacity onPress={props.navigate}>
      <ImageBackground
        style={[
          s.listItem,
          isOdd(props.index) ? { marginTop: 26 } : { marginBottom: 26 },
          s.feeImageBackground
        ]}
        imageStyle={{ borderRadius: 10 }}
        source={{
          uri: props.item.urls.small
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          start={[0.5, 0.7]}
          style={[s.listItem, s.absoluteTop]}
        />
        <Text style={s.feePhotoTitle}>{getPhotoTitle(props.item)}</Text>
        <Text style={s.feeLikes}>{`${props.item.likes} likes`}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
