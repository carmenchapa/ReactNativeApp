import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { UPDATE } from "../Constants";
import { unsplash } from "../modules/Unsplash";

//-----** Store **-----//

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

//-----** Reducers **-----//

export const imgsReducer = (state = defaultState, action) => {
  console.log("inside imgsReducer");
  switch (action.type) {
    case UPDATE:
      return { ...state, images: action.payload };

    default:
      return state;
  }
};

//-----** Actions **-----//

export const updateImages = images => ({
  type: UPDATE,
  payload: images
});

const rootReducer = combineReducers({
  getRandomImages,
  images: imgsReducer
});

export default createStore(rootReducer, applyMiddleware(...middlewares));
