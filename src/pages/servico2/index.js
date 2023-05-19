import React, { useEffect, useState } from "react";
import styles from "./Home.module.sass";
import Card from "@/components/Card";
import Servico from "../servico";
import Map from "./components/Map/index";
import { useSelector, useDispatch } from "react-redux";
import { setMaps } from "@/context/locationSlice";
import useHandleConfig from "@/hooks/useConfig";
import useHandleNotification from "@/hooks/useNotification";
import useHandleService from "@/hooks/useService";
import { toName } from "@/libs/utils";
import CardForm from "../../components/CardForm";

export default function index() {
  const dispatch = useDispatch();
  const maps = useSelector((state) => state.location.maps);
  const service = useSelector((state) => state.service.service);

  const { config } = useHandleConfig();
  const { notification } = useHandleNotification();
  const { order, user } = useHandleService();
  const [latitude, setLatitude] = useState();

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

      setLatitude(latitude);
    }
  }, [latitude]);

  return (
    <>
      <div className={styles.home}>
        <div style={{ padding: "1%", width: "100%" }}>
          <CardForm
            children={<Servico service={service} />}
            service={service}
          />
        </div>
      </div>
    </>
  );
}
