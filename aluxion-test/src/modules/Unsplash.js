import Unsplash from "unsplash-js/native";
import { ACCESS_KEY, SECRET_KEY } from "../Constants";

//-----** Unsplash **-----//

export const unsplash = new Unsplash({
  applicationId: ACCESS_KEY,
  secret: SECRET_KEY
});
