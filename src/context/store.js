"use client";

import { configureStore } from "@reduxjs/toolkit";
import LocationSlice from "./locationSlice";

export default configureStore({
  reducer: {
    location: LocationSlice,
  },
});
