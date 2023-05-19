"use client";

import { configureStore } from "@reduxjs/toolkit";
import LocationSlice from "./locationSlice";
import ServiceSlice from "./serviceSlice";


export default configureStore({
  reducer: {
    location: LocationSlice,
    service: ServiceSlice,
  },
});
