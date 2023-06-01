import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from "./Home.module.sass";
import CardHome from "@/components/CardHome";
import Map2 from "./components/Map2";
import {useSelector, useDispatch} from "react-redux";
import {setService} from "@/context/serviceSlice";
import useHandleConfig from "@/hooks/useConfig";
import useHandleNotification from "@/hooks/useNotification";
import useHandleService from "@/hooks/useService";
import {toName} from "@/libs/utils";
import getMylocation from "@/utils/getMylocation";
export default function Index() {
    const dispatch = useDispatch();
    const service = useSelector((state) => state.service.service);
    const {origin, destination, location, isOpen,step} = service;
    const [cardHeight,setCardHeight]= useState(null)

    const {config} = useHandleConfig();
    const {notification} = useHandleNotification();
    const {user} = useHandleService();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [routeGeoJSON, setRouteGeoJSON] = useState(null);
    const [formHeight, setFormHeight] = useState(null);
    const [back, setBack] = useState(true);
    const [myLocation, setMyLocation] = useState("")
    const divRef = useRef()
    const [newLocation, setNewLocation] = useState(null)

    useEffect(() => {
  
        if (divRef.current) {
          console.log(divRef.current)
          const { clientWidth, clientHeight } = divRef.current;
          
          setCardHeight(clientHeight)
        }
      }, [divRef,isOpen]);

    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

                const {latitude, longitude} = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);


                if (location) 
                    return;
                

                dispatch(setService({
                    ... service,
                    location: [
                        longitude, latitude
                    ],
                    latitude,
                    longitude


                }));


            } catch (error) {
                console.error("Error getting current location:", error);
            }
        };

        getCurrentLocation();
    }, [dispatch, service, latitude]);


    useEffect(() => {

        if (!longitude || myLocation.length > 0) 
            return;
        


        const getMyloc = async () => {
            const myloc = await getMylocation(latitude, longitude)

            if (! myloc) 
                return;
            

            setMyLocation(myloc[0].properties.name)

            return myloc

        } 
        getMyloc()

    }, [myLocation, latitude])


    const handleService = (dados) => {
        console.log(dados)
        dispatch(setService({
            ...service,
            ...dados
          }));

    };


    return (
        <div    className={
            styles.home
          
        }>
            <div className={styles.map}>
<Map2
cardHeight={cardHeight}
            setNewLocation={setNewLocation}
            service={service}
            formHeight={formHeight}
            handleService={handleService}
           
                    step={
                        service.step
                    }
                    myLocation={myLocation}
                    config={config}
                    latitude={latitude}
                    longitude={longitude}
               
            
                    user={
                        user && user.name && toName(user.name)
                    }
          />
            
</div>

<div ref={divRef} data-isopen={isOpen} className={styles.card}>

<CardHome handleService={handleService}
  service={service}
  step={
    step
  }
  myLocation={myLocation}
  config={config}
  latitude={latitude}
  longitude={longitude}
  setNewLocation={setNewLocation}
  formHeight={formHeight}
  user={
    user
  } />
  </div>
        
           
            </div>
    
    );
}
