import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";

export default configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
  },
});
