import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "@/context/locationSlice";
import { myLocation } from "@/utils/myLocation";

import Image from "next/image";
import styles from "./Map.module.sass";

<handleClientScriptLoad>
  <script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>
  <link
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
    rel="stylesheet"
  />
</handleClientScriptLoad>;

const Map = ({ actvitie, setActvitie }) => {
  const mapRef = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const pin = require("../pin.svg");

  const location = useSelector((state) => state.location.value);
  const dispatch = useDispatch();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicnV0aGVybGVzIiwiYSI6ImNsaGF3bnJwMjBsY3kzZm4xcWYza3hka3cifQ.6Fz6MQnPiCgAUvTTyUd9mw";
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/rutherles/clhcoqnha008x01pecudrduj6",
      center: [-40.2857037, -20.2821915],
      zoom: 17,
      locale: "pt-BR",
      pitch: 40,
      bearing: 20,
      antialias: true,
    });

    setMap(map);
  }, []);

  useEffect(() => {
    if (!map && !latitude && !longitude) return;
    const el = document.createElement("div");

    const puckEl = document.createElement("div");
    puckEl.className = styles.ping;

    ReactDOM.render(
      <Image alt="" className={styles.dot} src={pin} width={60} height={60} />,
      puckEl
    );

    el.appendChild(puckEl);

    setLocation({
      ...location,
    });

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      rotation: 45,
      offset: [0, -60],
      element: el,
      rotationAlignment: "map",
      pitchAlignment: "map",
      scale: 1,

      anchor: "bottom",
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    setMarker(newMarker);

    map.setCenter([longitude, latitude]);

    return () => {
      newMarker.remove();
    };
  }, [latitude, longitude]);

  useEffect(() => {
    if (!map) return;

    if (actvitie == true) {
      map.panTo([longitude, latitude], {
        duration: 1000,
        easing: function (t) {
          return t;
        },
        offset: [-100, -100],
        zoom: 16,
      });
    } else {
      map.setZoom(17);
    }

    console.warn(actvitie);
  }, [actvitie]);

  return <div className={styles.map} ref={mapRef}></div>;
};

export default Map;
