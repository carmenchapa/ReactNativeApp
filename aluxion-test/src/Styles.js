import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  endContent: {
    justifyContent: "flex-end"
  },
  startContent: {
    justifyContent: "flex-start"
  },
  fullFill: {
    height: "100%",
    width: "100%"
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
  pageTitle: {
    fontFamily: "MuseoBlack",
    fontSize: 24,
    lineHeight: 28
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  },
  listItem: {
    width: wp("40%"),
    height: wp("55%"),
    borderRadius: 10
  },
  columnWrapperStyle: {
    flex: 1,
    justifyContent: "space-between"
  },
  feeImageBackground: {
    justifyContent: "flex-end",
    padding: 10,
    overflow: "hidden"
  },
  feePhotoTitle: {
    fontFamily: "MuseoMedium",
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 5,
    color: "#fff"
  },
  feeLikes: {
    fontFamily: "MuseoLight",
    fontSize: 8,
    lineHeight: 9,
    color: "#fff"
  },
  detailInfo: {
    padding: 26
  },
  detailPhotoTitle: {
    fontFamily: "MuseoMedium",
    fontSize: 42,
    lineHeight: 49,
    color: "#fff"
  },
  detailLikes: {
    fontFamily: "MuseoLight",
    fontSize: 14,
    lineHeight: 16,
    color: "#fff"
  },
  detailUserName: {
    fontFamily: "MuseoMedium",
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 8,
    color: "#fff"
  },
  viewProfile: {
    fontFamily: "MuseoRegular",
    fontSize: 10,
    lineHeight: 12,
    color: "#fff"
  },
  profileContainer: {
    flexDirection: "row",
    paddingTop: 26,
    paddingLeft: 25,
    marginRight: 25,
    marginBottom: 30
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  profileUserName: {
    fontFamily: "MuseoMedium",
    fontSize: 22,
    lineHeight: 26,
    paddingBottom: 8,
    color: "#000"
  },
  profileDescription: {
    // flex: 1,
    fontFamily: "MuseoLight",
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 8,
    paddingRight: 25,
    color: "#000"
  }
});
