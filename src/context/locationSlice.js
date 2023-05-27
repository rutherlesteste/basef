import { createSlice } from "@reduxjs/toolkit";

const LocationSlice = createSlice({
  name: "location",
  initialState: {
    value: {
      lat: 0,
      lng: 0,
      isLocation: false,
      value: "",
      endereco: "",
      permission: false,
      place: "",
      locationType: "",
      makers: false,
      boundingBoxOrigin: null,
      boundingBoxDestination: null,
    },
    origin: {
      lat: 0,
      lng: 0,
      isOrigin: false,
      place: null,
      value: "",
    },

    service: {},

    maps: {
      center: [-40.2857037, -20.2821915],
      zoom: 17,
      locale: "pt-BR",
      pitch: 40,
      bearing: 20,
      map: null,
      antialias: true,
      marker: {
        latitude: 0,
        longitude: 0,
        draggable: true,
      },
    },

    destination: {
      lat: 0,
      lng: 0,
      isDestination: false,
      place: null,
      value: "",
      router: false,
    },
    message: {
      message: "",
      title: "",
      description: "",
    },
    suggestions: {
      suggestions: [],
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },

    setMaps: (state, action) => {
      state.maps = action.payload;
    },
  },
});

export const {
  setLocation,
  setOrigin,
  setDestination,
  setMessage,
  setSuggestions,
  setMaps,
} = LocationSlice.actions;

export default LocationSlice.reducer;
