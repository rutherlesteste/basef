import { MAP_BOX_TOKEN } from "@/constants/keys";
import React, { useState, useEffect } from "react";
import axios from "axios";

const useGetRoute = async (data) => {
  const encodedUrl = encodeURI(data);
  let route = [];
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedUrl}.json?country=br&limit=4&language=pt&autocomplete=true&fuzzyMatch=false&routing=false&access_token=${MAP_BOX_TOKEN}`;
    const response = await axios.get(url);

    route = response.data.features;
  } catch (error) {
    console.error(error);
  }

  return route;
};

export default useGetRoute;
