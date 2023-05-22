import React, { useEffect, useState } from "react";
import styles from "./Home.module.sass";
import CardHome from "@/components/CardHome";
import Map2 from "./components/Map2";
import { useSelector, useDispatch } from "react-redux";
import { setService } from "@/context/serviceSlice";
import useHandleConfig from "@/hooks/useConfig";
import useHandleNotification from "@/hooks/useNotification";
import useHandleService from "@/hooks/useService";
import { toName } from "@/libs/utils";

export default function Index() {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.service);

  const { config } = useHandleConfig();
  const { notification } = useHandleNotification();
  const { user } = useHandleService();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);

        dispatch(
          setService({
            ...service,
            location: { longitude, latitude },
            makers: [
              {
                coordinates: [longitude, latitude],
                type: "position",
              },
            ],
          })
        );
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    getCurrentLocation();
  }, []);

  const handleService = (data) => {
  
 

    dispatch(
      setService({
        ...service,
        originPlace: data.originPlace,
        origin: data.origin,
        makers: location == 1 ? data.makers : newMakers,
        destination: data.destination,
        destinationPlace: data.destinationPlace
        
      })
    );
  };

  return (
    <div className={styles.home}>
      <Map2 service={service} latitude={latitude} longitude={longitude} />

      <div className={styles.form}>
        <CardHome
          handleService={handleService}
          service={service}
          step={service.step}
          config={config}
          latitude={latitude}
          longitude={longitude}
          user={user && user.name && toName(user.name)}
        />
      </div>
    </div>
  );
}
