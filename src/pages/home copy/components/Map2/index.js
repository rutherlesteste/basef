import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import ReactMapGL, { Marker, GeolocateControl, Source, Layer } from "react-map-gl";
import { WebMercatorViewport } from "viewport-mercator-project";
import { useDispatch } from "react-redux";
import { FloatingMarker, FLOATING_MARKER_SIZES, FLOATING_MARKER_ANCHOR_POSITIONS, FLOATING_MARKER_ANCHOR_TYPES, LocationPuck, LOCATION_PUCK_TYPES } from "baseui/map-marker";
import getDistance from "@/utils/getDistance";
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from "./Map.module.sass";

const layerStyle = {
  id: "route",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#2b85ff",
    "line-opacity": 0.8,
    "line-width": {
      base: 1,
      stops: [
        [12, 3],
        [22, 12],
        [32, 22],
      ],
    },
    "line-blur": 0.5,
  },
};




function Map2({
  handleService,
  service,
  setNewLocation,
  myLocation,
  app,
  formHeight,
}) {



  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const mapRef = useRef(null);

  




  const [userLocation, setUserLocation] = useState(() => ({
    latitude: 37.768495131168336,
    longitude: -122.38856031220648,
  }));
  const [viewport, setViewport] = useState({
    ...userLocation,
    zoom: 15.9
  });
  const { cardHeight ,isOpen } = app;



  const getGeojson = useCallback(async () => {
    try {
      const newRouteGeoJSON = await getDistance(service.origin, service.destination);
      setRouteGeoJSON(newRouteGeoJSON);
      handleService({ distance: newRouteGeoJSON?.distance });
    } catch (error) {
      console.error("Erro ao carregar o GeoJSON:", error);
      
    }
  }, [service.destination]);

  useEffect(() => {
    if (service.destination && service.origin) {
      getGeojson();
    }
  }, [service.destination, service.origin]);


  const setNewUserLocation = (newLocation) => {
    setViewport((prevState) => ({
      ...prevState,
      ...newLocation,
    }));
  };



  useEffect(() => {


    if (service.location && service.origin && !service.destination) {
      setNewUserLocation({
        longitude: service.origin[0],
        latitude: service.origin[1],
        zoom: 15.9,
      });
    }

    if (service.location && !service.origin && !service.destination) {
      setNewUserLocation({
        longitude: service.location[0],
        latitude: service.location[1],
        zoom: 15.9,
      });
    }
  }, [service.origin, service.destination, service.location]);


  useEffect(() => {
    if (!routeGeoJSON || !service.destination) return;

    console.log(routeGeoJSON)

    const coordinates = routeGeoJSON.geometry?.coordinates;

    if (coordinates && coordinates.length > 0) {
      const tamanho = coordinates.length - 1;
      const minCord = coordinates[0];
      const maxCord = coordinates[tamanho];
      const padding = 15;

      const viewport = {
        longitude: (minCord[0] + maxCord[0]) / 2,
        latitude: (minCord[1] + maxCord[1]) / 2,
        zoom: 10,
        width: window.innerWidth - 50,
        height: window.innerHeight - cardHeight -30 ,
      };

      const { longitude, latitude, zoom } = new WebMercatorViewport(viewport).fitBounds(
        [
          [minCord[0], minCord[1]],
          [maxCord[0], maxCord[1]],
        ],
        { padding }
      );

      setViewport({
        ...viewport,
        longitude,
        latitude,
        zoom,
      });
    }
  }, [routeGeoJSON, service.destination]);


  const [mapSize, setMapSize] = useState({


    width: '100%',
    height: '100%'
  });

  const renderMarkers = useMemo(() => {
    return (
      <div>
        {service.location && !service.origin && (
          <Marker longitude={service.location[0]} latitude={service.location[1]}>
            <div id="ping" className={styles.ping}>
              <div>
                <div className={styles.dot} id="dot" />
                <LocationPuck
                  type={LOCATION_PUCK_TYPES.consumer}
                  
                />
              </div>
            </div>
          </Marker>
        )}

        {service.origin && (
          <Marker longitude={service.origin[0]} latitude={service.origin[1]}>
            <FloatingMarker
              label={"..."}
              size={FLOATING_MARKER_SIZES.small}

              startEnhancer={() => <span>{service.originPlace}</span>}
              anchor={FLOATING_MARKER_ANCHOR_POSITIONS.bottomRight}
              
            />
          </Marker>
        )}

        {service.destination && (
          <Marker latitude={service.destination[1]} longitude={service.destination[0]}>
            <FloatingMarker
              secondaryLabel="Fastest route"
              label={"..."}
              size={FLOATING_MARKER_SIZES.small}
              anchor={FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft}
              anchorType={FLOATING_MARKER_ANCHOR_TYPES.square}
              startEnhancer={() => <span>{service.destinationPlace}</span>}
              overrides={{
                label: {
                  width: "30px",
                },
              }}
            />
          </Marker>
        )}
      </div>
    );
  }, [service.destination, service.origin, service.location]);

  useEffect(() => {
    const handleResize = () => {
      setMapSize((prevMapSize) => ({
        ...prevMapSize,
        width: window.innerWidth,
        height: window.innerHeight - cardHeight,
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);


  return (
    <ReactMapGL
      {...viewport}
      {...mapSize}
      ref={mapRef}
      onLoad={() => handleService({ onLoad: true })}
      mapStyle="mapbox://styles/rutherles/clijbpqac00ni01qh0c2i6b5w"
      onViewportChange={setViewport}
      mapboxApiAccessToken="pk.eyJ1IjocicnJ1dGhlcmxlcyIsImEiOiJjbGhhd25ycDIwbGN5M2ZuMXFmM2t5a2t3Iiwib3BlbmJxX2FsY29zcyI6IjBNSnVOUW5QaUNnQVV2VFR5VWQ5bXciLCJpYXQiOjE2MjI3MzEzNjIsImV4cCI6MTYyMzQ4MzU2Mn0.4USyYX-Vi6CndADnbsLxug"
      transitionDuration={200}
    >
      <GeolocateControl />
      {renderMarkers}

      {service.destination && routeGeoJSON && service.origin && (
        <Source id="route" type="geojson" data={routeGeoJSON}>
          <Layer {...layerStyle} />
        </Source>
      )}
    </ReactMapGL>
  );
}

export default Map2;
