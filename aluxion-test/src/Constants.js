import { Platform } from "react-native";
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

//-----** Keys **-----//

export const ACCESS_KEY =
  "a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa";
export const SECRET_KEY =
  "4ea19af370997bcb0c580c071437661346b073b8e2f5252871e171ecc3c783ee";

//-----** Dimensions **-----//

export const NAVBAR_HEIGHT = hp("14%");
export const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

//-----** ActionTypes **-----//

export const UPDATE = "UPDATE";
