import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./Map.module.sass";
import { WebMercatorViewport } from "viewport-mercator-project";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import {
  FloatingMarker,
  FLOATING_MARKER_SIZES,
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_ANCHOR_TYPES,
  LocationPuck,
  LOCATION_PUCK_TYPES,
} from "baseui/map-marker";
import { toName } from "@/libs/utils";
import getDistance from "@/utils/getDistance";

export default function Map2(props) {
const[routeGeoJSON,setRouteGeoJSON] = useState(null)
const {service} = props
const {
    origin,
    destination,
    originPlace,
    destinationPlace,
    location
  } = service




  const [userLocation, setUserLocation] = useState({
    latitude: 37.768495131168336,
    longitude: -122.38856031220648,
    zoom: 17,
  });


  const getRoutes = async () => {
    if (!destination || !origin) return;

    try {
      const coordinates = await getDistance(origin, destination);

      const newRouteGeoJSON = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates[0].geometry.coordinates,
        },
      };

    } catch (error) {
      console.error("Error getting routes:", error);
    }
  };


console.log(service)

  const setNewUserLocation = (newLocation) => {
    setUserLocation(newLocation)
  }



useEffect(() => {
  if (!destination) return; 
  getRoutes()
}, [destination])




  useEffect(() => {
    if (origin && !destination) {
      setNewUserLocation({
        ...userLocation,
        latitude: origin[1],
        longitude: origin[0],
        zoom: 16,
      });
    }
  }, [origin, destination, userLocation]);

  useEffect(() => {
    if (!location) return;
  
    if (location && !origin && !destination) {
      setNewUserLocation({
        latitude: location[1],
        longitude: location[0],
        zoom: 17,
      });
    }
  }, [location, origin, destination]);

  useEffect(() => {
    if (!routeGeoJSON) return;
  
    const coordinates = routeGeoJSON.geometry?.coordinates;
  
    if (coordinates && coordinates.length > 0) {
      const tamanho = coordinates.length - 1;
      const minCord = coordinates[0];
      const maxCord = coordinates[tamanho];
      const padding = 125;
  
      const viewport = {
        longitude: (minCord[0] + maxCord[0]) / 2,
        latitude: (minCord[1] + maxCord[1]) / 2,
        zoom: 1,
        altitude: 200,
        width: window.innerWidth,
        height: window.innerHeight,
      };
  
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds(
        [
          [minCord[0], minCord[1]],
          [maxCord[0], maxCord[1]],
        ],
        { padding }
      );
  
      setNewUserLocation((prevLocation) => ({
        ...prevLocation,
        longitude,
        latitude,
        zoom,
      }));
    }
  }, [routeGeoJSON, destination, userLocation]);
  

  const renderMarkers = useMemo(() => {
    return (
      <>
        {location && !origin && (
          <Marker
            longitude={location[0]}
            latitude={location[1]}
            offsetLeft={-60}
          >
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
          <Marker longitude={origin[0]} latitude={origin[1]} offsetLeft={-60}>
            <FloatingMarker
              label={"..."}
              size={FLOATING_MARKER_SIZES.small}
              startEnhancer={() => <span>{toName(originPlace)}</span>}
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

        {destination && routeGeoJSON && (
          <>
            <Marker
              latitude={destination[1]}
              longitude={destination[0]}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <FloatingMarker
                secondaryLabel="Fastest route"
                label={"..."}
                size={FLOATING_MARKER_SIZES.small}
                anchor={FLOATING_MARKER_ANCHOR_POSITIONS.bottomRight}
                anchorType={FLOATING_MARKER_ANCHOR_TYPES.square}
                startEnhancer={() => <span>{toName(destinationPlace)}</span>}
                overrides={{
                  label: {
                    width: "30px",
                  },
                }}
              />
            </Marker>

            <Source id="route" type="geojson" data={routeGeoJSON}>
              <Layer {...layerStyle} />
            </Source>
          </>
        )}
      </>
    );
  }, [destination, origin, routeGeoJSON,location , userLocation]);

  return (
    <ReactMapGL
      {...userLocation}
      id="map"
      reuseMaps
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/rutherles/clhcoqnha008x01pecudrduj6"
      onViewportChange={setNewUserLocation}
      transitionDuration={200}
    >
      <GeolocateControl />
      {renderMarkers}
    </ReactMapGL>
  );
}
