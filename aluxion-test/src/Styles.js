import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  HORIZONTAL_PADDING,
  NAVBAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from "./Constants";

export const styles = StyleSheet.create({
  //-----** General styles **-----//
  flx1: { flex: 1 },
  centerContent: { justifyContent: "center" },
  endContent: { justifyContent: "flex-end" },
  startContent: { justifyContent: "flex-start" },
  centerItems: { alignItems: "center" },
  fullFill: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  absoluteTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  //-----** Header **-----//
  headerContainer: {
    justifyContent: "center",
    marginHorizontal: HORIZONTAL_PADDING,
    paddingTop: hp("4%")
  },
  header: {
    height: NAVBAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  //-----** FlatList **-----//
  pageTitle: {
    fontFamily: "MuseoBlack",
    fontSize: 24,
    lineHeight: 28
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
  //-----** Detail **-----//
  detailInfo: {
    padding: HORIZONTAL_PADDING
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
  //-----** Profile **-----//
  profileContainer: {
    flexDirection: "row",
    paddingTop: 26,
    paddingLeft: HORIZONTAL_PADDING,
    marginRight: HORIZONTAL_PADDING,
    marginBottom: 30
  },
  profileTouchable: {
    position: "absolute",
    top: 90,
    bottom: 90,
    left: 90,
    right: 90
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  profileHeader: {
    marginTop: hp("11%")
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
    fontFamily: "MuseoLight",
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 8,
    paddingRight: HORIZONTAL_PADDING,
    color: "#000"
  }
});
