import { createSlice } from "@reduxjs/toolkit";

const ServiceSlice = createSlice({
  name: "service",
  initialState: {
    service: {
      origin: 0,
      destination: 0,
      distance: 0,
      value: "",
      id: "",
      servico: "",
      helpers: 0,
      mounters: 0,
      hours: 0,
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
