import { Asset } from "expo-asset";

export default class Images {
  static menu = require("../Resources/icons/ic_menu/ic_menu_black.png");
  static close = require("../Resources/icons/ic_close/ic_close_black.png");
  static close2 = require("../Resources/icons/ic_close/ic_close_black2x.png");
  static close3 = require("../Resources/icons/ic_close/ic_close_black3x.png");
  static closeWhite = require("../Resources/icons/ic_close/ic_close_white.png");
  static closeWhite2 = require("../Resources/icons/ic_close/ic_close_white2x.png");
  static closeWhite3 = require("../Resources/icons/ic_close/ic_close_white3x.png");

  static downloadAsync() {
    return [
      Asset.fromModule(Images.menu).downloadAsync(),
      Asset.fromModule(Images.close).downloadAsync(),
      Asset.fromModule(Images.close2).downloadAsync(),
      Asset.fromModule(Images.close3).downloadAsync(),
      Asset.fromModule(Images.closeWhite).downloadAsync(),
      Asset.fromModule(Images.closeWhite2).downloadAsync(),
      Asset.fromModule(Images.closeWhite3).downloadAsync()
    ];
  }
}
