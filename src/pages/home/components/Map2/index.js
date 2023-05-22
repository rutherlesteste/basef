import React, { useEffect, useState, useMemo } from "react";
import { LocationPuck } from "baseui/map-marker";
import ReactMapGL, { Marker, GeolocateControl, Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  FloatingMarker,
  FLOATING_MARKER_SIZES,
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_ANCHOR_TYPES,
} from "baseui/map-marker";

import styles from "./Map.module.sass";

export default function Map2(props) {
  const { service, latitude, longitude } = props;
  const { makers } = service;

  const [userLocation, setUserLocation] = useState({
    latitude: 37.768495131168336,
    longitude: -122.38856031220648,
    zoom: 17,
  });

  useEffect(() => {
    if (latitude && longitude) {
      setUserLocation((prevLocation) => ({
        ...prevLocation,
        latitude,
        longitude,
      }));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (makers && makers.length > 0) {
      const firstMaker = makers[0];
      setUserLocation({
        ...userLocation,
        latitude: firstMaker.coordinates[1],
        longitude: firstMaker.coordinates[0],
      });
    }
  }, [makers]);

  console.log(service);

  const renderMarkers = useMemo(() => {
    if (!makers) return null;

    return makers.map((maker, index) => {
      const lng = maker.coordinates[0];
      const lat = maker.coordinates[1];

      return (
        <>
          <Marker key={index} longitude={lng} latitude={lat} offsetLeft={-80}>
            {!service.origin ? (
              <div id="ping" className={styles.ping}>
                <div>
                  <div className={styles.dot} id="dot" />
                  <LocationPuck
                    confidenceRadius={120}
                    size={FLOATING_MARKER_SIZES.large}
                    overrides={{
                      Root: {
                        style: () => ({
                          transform: `translate(-50%, -50%)`,
                        }),
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              <FloatingMarker
                label={maker.place}
                size={FLOATING_MARKER_SIZES.large}
                overrides={{
                  Root: {
                    style: () => ({
                      transform: `translate(-50%, -50%)`,
                    }),
                  },
                }}
              />
            )}
          </Marker>

          {service.destination && (
            <Marker
              latitude={service.destination[1]}
              longitude={service.destination[0]}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <FloatingMarker
                label={service.destinationPlace}
                size={FLOATING_MARKER_SIZES.large}
                anchor={FLOATING_MARKER_ANCHOR_POSITIONS.bottomRight}
                anchorType={FLOATING_MARKER_ANCHOR_TYPES.square}
                overrides={{
                  Root: {
                    style: () => ({
                      transform: `translate(-50%, -50%)`,
                    }),
                  },
                }}
              />
            </Marker>
          )}
        </>
      );
    });
  }, [makers]);

  return (
    <ReactMapGL
      {...userLocation}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/rutherles/clhcoqnha008x01pecudrduj6"
      onViewportChange={setUserLocation}
      mapboxApiAccessToken="pk.eyJ1IjoicnV0aGVybGVzIiwiYSI6ImNsaGF3bnJwMjBsY3kzZm4xcWYza3hka3cifQ.6Fz6MQnPiCgAUvTTyUd9mw"
      transitionDuration={200}
    >
      {renderMarkers}

      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserLocation={true}
      />
    </ReactMapGL>
  );
}
