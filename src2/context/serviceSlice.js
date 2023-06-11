import { createSlice } from "@reduxjs/toolkit";
 

const ServiceSlice = createSlice({
  name: "service",
  initialState: {
    service: {
      origin: null,
      destination: null,
      location: null ,
      distance: 0,
      value: "",
      id: "",
      servico: "",
      helpers: 0,
      latitude : null,
      longitude : null,
      mounters: 0,
      hours: 0,
      makers: null,
      step: 1,
      originPlace: "",
      zoom: 17,
      destinationPlace: "",
      routeGeoJSON: null,
      labelLocation: null,
      isOpen : false,
      boundingBoxOrigin: null,
      boundingBoxDestination: null,
    },
  },

  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },
  },
});

export const { setService } = ServiceSlice.actions;

export default ServiceSlice.reducer;
