import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "../components/map/mapSlice";

export default configureStore({
  reducer: {
    map: mapReducer,
  },
});
