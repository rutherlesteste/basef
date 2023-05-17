import { MAP_BOX_TOKEN } from "@/constants/keys";
import React, { useState, useEffect } from "react";
import axios from "axios";

const getDistance = async (origin, destination) => {
  let route = [];

  if (!destination) return;

  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?alternatives=false&geometries=geojson&language=pt&overview=simplified&steps=true&access_token=${MAP_BOX_TOKEN}`;

    const response = await axios.get(url);
    route = response.data.routes;
    console.log(route);
  } catch (error) {
    console.log(error);
  }

  return route;
};

export default getDistance;
