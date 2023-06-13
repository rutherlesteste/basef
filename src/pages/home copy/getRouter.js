import { MAP_BOX_TOKEN } from "@/constants/keys";
import React, { useState, useEffect } from "react";
import axios from "axios";

const useGetRoute = ({ data, setArraySugestions }) => {
  const [route, setRoute] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedUrl = encodeURI(data);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedUrl}.json?country=br&limit=4&language=pt&autocomplete=true&fuzzyMatch=false&routing=false&access_token=${MAP_BOX_TOKEN}`;
        const response = await axios.get(url);

        const routeData = response.data.features;
        setRoute(routeData);
        setArraySugestions(routeData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [data]);

  return { route, error };
};

export default useGetRoute;
