import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from "./Map.module.sass";
import { WebMercatorViewport } from "viewport-mercator-project";
import { useDispatch } from "react-redux";
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker, GeolocateControl, Source, Layer } from "react-map-gl";
import { FloatingMarker, FLOATING_MARKER_SIZES, FLOATING_MARKER_ANCHOR_POSITIONS, FLOATING_MARKER_ANCHOR_TYPES, LocationPuck, LOCATION_PUCK_TYPES } from "baseui/map-marker";
import getDistance from "@/utils/getDistance";

const layerStyle = {
  id: "route",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#007AFF",
    "line-opacity": 0.8,
    "line-width": {
      base: 1,
      stops: [
        [12, 3],
        [22, 12],
        [32, 22],
      ],
    },
  },
};

function Map2(props) {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const makerRef = useRef();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const { handleService, service, setNewLocation, myLocation, config, app, formHeight, user } = props;

  const divRef = useRef();
  const [userLocation, setUserLocation] = useState({
    latitude: 37.768495131168336,
    longitude: -122.38856031220648,
  });
  const [viewport, setViewport] = useState({
    ...userLocation,
    zoom: 15.9
  });
  const { cardHeight, isOpen } = app;

  const [mapSize, setMapSize] = useState({
    width: '100%',
    height: '100%'
  });

  const {origin,destination,location ,destinationPlace,originPlace} = service

  const setNewUserLocation = (newLocation) => {
    setViewport((prevState) => ({
      ...prevState,
      ...newLocation,
    }));
  };

  const getGeojson = async () => {
    const newRouteGeoJSON = await getDistance(origin, destination);
    setRouteGeoJSON(newRouteGeoJSON);
    handleService({ distance: newRouteGeoJSON?.distance });
  };

  useEffect(() => {
    if (destination && origin) {
      getGeojson();
    }

    if (location && origin && !destination) {
      setNewUserLocation({
        longitude: origin[0],
        latitude: origin[1],
        zoom: 15.9,
      });
    }

    if (location && !origin && !destination) {
      setNewUserLocation({
        longitude: location[0],
        latitude: location[1],
        zoom: 15.9,
      });
    }
  }, [origin, destination, location]);

  useEffect(() => {
    if (!routeGeoJSON || !destination) return;

    const coordinates = routeGeoJSON.geometry?.coordinates;

    if (coordinates && coordinates.length > 0) {
      const tamanho = coordinates.length - 1;
      const minCord = coordinates[0];
      const maxCord = coordinates[tamanho];
      const padding = 10;

      const viewport = {
        longitude: (minCord[0] + maxCord[0]) / 2,
        latitude: (minCord[1] + maxCord[1]) / 2,
        zoom: 5,
        width: window.innerWidth -25,
        height: window.innerHeight - cardHeight + 50 ,
      };

      const { longitude, latitude, zoom } = new WebMercatorViewport(viewport).fitBounds(
        [
          [minCord[0], minCord[1]],
          [maxCord[0], maxCord[1]],
        ],
        { padding }
      );

      setNewUserLocation({
        longitude,
        latitude,
        zoom,
      });
    }
  }, [routeGeoJSON, destination]);

  const renderMarkers = useMemo(() => {
    return (
      <div>
        {location && !origin && (
          <Marker  longitude={location[0]} latitude={location[1]}>
            <div id="ping" className={styles.ping}>
              <div>
                <div className={styles.dot} id="dot" />
                <LocationPuck
                
                  type={LOCATION_PUCK_TYPES.consumer}
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
          </Marker>
        )}

        {origin && (
          <Marker  longitude={origin[0]} latitude={origin[1]}>
            <FloatingMarker
              label={"..."}
              size={FLOATING_MARKER_SIZES.small}
              startEnhancer={() => <span>{originPlace}</span>}
              overrides={{
                Root: {
                  style: () => ({
                    transform: `translate(-50%, -90%)`,
                  }),
                },
              }}
            />
          </Marker>
        )}

        {destination && (
          <>
            <Marker latitude={destination[1]} longitude={destination[0]}>
              <FloatingMarker
                secondaryLabel="Fastest route"
                label={"..."}
                size={FLOATING_MARKER_SIZES.small}
                anchor={FLOATING_MARKER_ANCHOR_POSITIONS.bottomRight}
                anchorType={FLOATING_MARKER_ANCHOR_TYPES.square}
                startEnhancer={() => <span>{destinationPlace}</span>}
                overrides={{
                  label: {
                    width: "30px",
                  },
                }}
              />
            </Marker>
          </>
        )}
      </div>
    );
  }, [destination, origin, location]);

  return (
    <ReactMapGL
      {...viewport}
      {...mapSize}
      h
      ref={mapRef}
      onLoad={() => handleService({ onLoad: true })}
      mapStyle="mapbox://styles/rutherles/clijbpqac00ni01qh0c2i6b5w"
      onViewportChange={setNewUserLocation}
      mapboxApiAccessToken="pk.eyJ1IjocicnJ1dGhlcmxlcyIsImEiOiJjbGhhd25ycDIwbGN5M2ZuMXFmM2t5a2t3Iiwib3BlbmJxX2FsY29zcyI6IjBNSnVOUW5QaUNnQVV2VFR5VWQ5bXciLCJpYXQiOjE2MjI3MzEzNjIsImV4cCI6MTYyMzQ4MzU2Mn0.4USyYX-Vi6CndADnbsLxug"
      transitionDuration={200}
    >
      <GeolocateControl />
      {renderMarkers}

      {destination && routeGeoJSON && origin && (
        <>
          <Source id="route" type="geojson" data={routeGeoJSON}>
            <Layer {...layerStyle} />
          </Source>
        </>
      )}
    </ReactMapGL>
  );
}

export default Map2;
