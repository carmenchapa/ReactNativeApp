import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import Unsplash from "unsplash-js/native";

const accesKey =
  "a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa";
const secretKey =
  "4ea19af370997bcb0c580c071437661346b073b8e2f5252871e171ecc3c783ee";

const unsplash = new Unsplash({
  applicationId: accesKey,
  secret: secretKey
});

const UPDATE = "UPDATE";

const middlewares = [thunk];

const defaultState = {
  images: []
};

export const getRandomImages = () => {
  console.log("inside getRandomImages");
  return dispatch =>
    unsplash.photos
      .listPhotos(Math.floor(Math.random() * 100), 16, "random")
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        return dispatch(updateImages(data));
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
};

//Reducer

export const imgsReducer = (state = defaultState, action) => {
  console.log("inside imgsReducer", action.payload);
  switch (action.type) {
    case UPDATE:
      return { ...state, images: action.payload };

    default:
      return state;
  }
};

//Action

export const updateImages = images => ({
  type: UPDATE,
  payload: images
});

const rootReducer = combineReducers({
  getRandomImages,
  images: imgsReducer
});

export default createStore(rootReducer, applyMiddleware(...middlewares));
