import { MAP_BOX_TOKEN } from "@/constants/keys";
import React, { useState, useEffect } from "react";
import axios from "axios";

const getDistance = async (data) => {
  const { origin, destination } = data;

  let route = [];
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin?.lng}.${origin?.lat}.${destination?.lng}.${destination?.lat}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${MAP_BOX_TOKEN}`;

    const response = await axios.get(url);
    route = response.data.features;
    console.log(route);
  } catch (error) {
    console.log(error);
  }

  return route;
};

export default getDistance;
