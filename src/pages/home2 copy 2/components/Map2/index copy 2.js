import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import styles from "./Map.module.sass";
import { WebMercatorViewport } from "viewport-mercator-project";
import { setService } from "@/context/serviceSlice";
import CardHome from "@/components/CardHome"
import { useDispatch } from "react-redux";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  Source,
  Layer,
  useMap,
  Map,

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

const layerStyle = {
  id: "route",
  type: "line",

  anchor: [2, 3, 4, 5],
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

function Map2({ handleService, service, height, setNewLocation,

  step,
  myLocation,
  config,



  formHeight,
  user }) {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const makerRef = useRef()
  const {
    origin,
    destination,
    originPlace,
    destinationPlace,
    location,
    latitude,
    longitude,
    isOpen,

  } = service;

  const [userLocation, setUserLocation] = useState({
    latitude: 37.768495131168336,
    longitude: -122.38856031220648,
    zoom: 17,
  });


  const [viewport, setViewport] = useState({
    ...userLocation,
    width: '100%',
    height: '100%'


  });


  useEffect(()=>{

    if (isOpen) {
      setViewport({
        ...viewport,
        height:'40vh'
      })
    }else(setViewport({
      ...viewport,
      height:'100vh'
    }))

    console.log(viewport)

  },[isOpen])


  const setNewUserLocation = (newLocation) => {
    setViewport(() => ({

      ...newLocation,
      ...newLocation,
    }));
  };

  const getGeojson = async () => {
    const newRouteGeoJSON = await getDistance(origin, destination);
    setRouteGeoJSON(newRouteGeoJSON);
  };


  

  useEffect(() => {
    if (destination && origin) {
      getGeojson();
    }

    if (location && origin && !destination) {

      setNewUserLocation({

        longitude: origin[0],
        latitude: origin[1],
        zoom: 17,
        
   

      });
    }

    if (location && !origin && !destination) {


      setNewUserLocation({
        longitude: location[0],
        latitude: location[1],
        zoom: 17,

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
      const padding = 100;

      const viewport = {

        longitude: (minCord[0] + maxCord[0]) / 2,
        latitude: (minCord[1] + maxCord[1]) / 2,
        zoom: 10,

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

      setNewUserLocation({
        
        longitude,
        latitude,
        zoom,

      });
    }
  }, [routeGeoJSON, destination]);

  const renderMarkers = useMemo(() => {

    return (
      <>
        {location && !origin && (
          <Marker

            longitude={location[0]}
            latitude={location[1]}


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
          <div style={{ paddingBlockEnd: '90px' }}>
            <Marker longitude={origin[0]} latitude={origin[1]}>
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
          </div>
        )}

        {destination && (
          <>
            <Marker
              latitude={destination[1]}
              longitude={destination[0]}



            >
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
      </>
    );
  }, [destination, origin, location]);

  return (
    <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column'}}>
      <Map
        {...viewport}


       onResize={()=>alert('zoom')}
        
    

      pitch={40}
     



        mapStyle="mapbox://styles/rutherles/clhcoqnha008x01pecudrduj6"
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
      </Map >

      <div style={{height: !isOpen ? '25vh': '100%'}}>

      <CardHome handleService={handleService}
        service={service}
        step={
          step
        }
        myLocation={myLocation}
        config={config}
        latitude={latitude}
        longitude={longitude}
        setNewLocation={setNewLocation} height={height}
        formHeight={formHeight}
        user={
          user
        } />
        </div>
    </div>
  )


}






export default Map2;
