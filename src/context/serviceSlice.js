import { createSlice } from "@reduxjs/toolkit";
 

const ServiceSlice = createSlice({
  name: "service",
  initialState: {
    service: {
      origin: false,
      destination: false,
      location: { latitude: -20.3468683, longitude: -40.3504468 },
      distance: 0,
      value: "",
      id: "",
      servico: "",
      helpers: 0,
      mounters: 0,
      hours: 0,
      makers: false,
      step: 1,
      originPlace: "",
      destinationPlace: "",
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
