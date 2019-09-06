import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { UPDATE, UPDATE_PROFILE } from "../Constants";
import { unsplash } from "../modules/Unsplash";

//-----** Store **-----//

const middlewares = [thunk];

const defaultState = {
  images: [],
  profileImages: []
};

//-----** Api Calls **-----//

export const getRandomImages = () => {
  return dispatch =>
    unsplash.photos
      .listPhotos(Math.floor(Math.random() * 100), 16, "random")
      .then(res => res.json())
      .then(data => dispatch(updateImages(data)))
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
};

export const getProfileImages = userName => {
  return dispatch =>
    unsplash.users
      .photos(userName, 1, 10)
      .then(res => res.json())
      .then(data => dispatch(updateProfile(data)))
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
};

//-----** Reducers **-----//

export const imgsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, images: action.payload };

    default:
      return state;
  }
};

export const profileImgsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, profileImages: action.payload };

    default:
      return state;
  }
};

//-----** Actions **-----//

export const updateImages = images => ({
  type: UPDATE,
  payload: images
});

export const updateProfile = profileImages => ({
  type: UPDATE_PROFILE,
  payload: profileImages
});

//-----** Combine Reducers **-----//

const rootReducer = combineReducers({
  getRandomImages,
  images: imgsReducer,
  profileImages: profileImgsReducer
});

//-----** Create Store **-----//

export default createStore(rootReducer, applyMiddleware(...middlewares));
