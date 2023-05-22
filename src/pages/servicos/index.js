import React, { useEffect } from "react";
import styles from "./Home.module.sass";
import Card from "@/components/CardHome";

import Map from "./components/Map/index";
import { useSelector, useDispatch } from "react-redux";

import {
  setOrigin,
  setDestination,
  setLocation,
  setMaps,
} from "@/context/locationSlice";

export default function index() {
  const dispatch = useDispatch();
  const maps = useSelector((state) => state.location.maps);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!position?.coords?.latitude) return;

        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;

        dispatch(
          setMaps({
            lat: latitude,
            lng: longitude,
            status: "location",
          })
        );
      });
    }
  }, []);

  return (
    <>
      <div className={styles.home}>
        <Map maps={maps} />
        <Card />
      </div>
    </>
  );
}
