import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMaps } from "@/context/locationSlice";
import { debounce } from "lodash";
import cn from "classnames";

import style from "./Card.module.sass";
import Image from "next/image";
import Icon from "../Icons";
import useGetRoute from "@/utils/getRouter";
import List from "../List";
import { Cancel, CancelOutlined, LocationDisabled } from "@mui/icons-material";
import getDistance from "@/utils/getDistance";
import { IconButton } from "@mui/material";

const avatar = require("../../images/avatar.jpg");

const Card = () => {
  const [suggestionsArray, setSuggestionsArray] = useState({
    suggestions: [],
    isOpen: false,
    input: "",
  });

  const location = useSelector((state) => state.location.value);

  const maps = useSelector((state) => state.location.maps);

  const dispatch = useDispatch();

  const locationRef = useRef(null);
  const destinationRef = useRef(null);
  const [locationInput, setLocationInput] = useState({
    origin: "",
    destination: "",
    valueOrigin: "",
    valueDestination: "",
    inputType: "",
  });

  const handleRoute = debounce(async (data, input) => {
    if (!data || data.length < 1) {
      setSuggestionsArray({
        ...suggestionsArray,
        isOpen: false,
        suggestions: [],
      });
      return;
    }

    if (data.length > 3) {
      const routeSuggestions = await useGetRoute(data, input);
      setSuggestionsArray({
        ...suggestionsArray,
        isOpen: true,
        suggestions: routeSuggestions,
        input: input,
      });
    }
  }, 300);

  const handleSetOrigem = async (data) => {
    if (locationInput.inputType == "origin") {
      setLocationInput({
        ...locationInput,
        valueOrigin: data.place_name,
      });

      dispatch(
        setMaps({
          ...maps,
          lat: data.center[1],
          lng: data.center[0],
          place: data.place_name,
          status: "origin",
          origin: [data.center[0], data.center[1]],
        })
      );

      destinationRef.current.focus();
    } else {
      setLocationInput({
        ...locationInput,
        valueDestination: data.place_name,
      });

      dispatch(
        setMaps({
          ...maps,
          lat: data.center[1],
          lng: data.center[0],
          place: data.place_name,
          status: "destination",
          destination: [data.center[0], data.center[1]],
        })
      );
    }
  };

  const handleInputChange = (locationType, value) => {
    if (locationType == "origin") {
      setLocationInput({
        ...locationInput,
        valueOrigin: value,
        inputType: locationType,
      });
      handleRoute(value, locationType);
    } else {
      setLocationInput({
        ...locationInput,
        valueDestination: value,
        inputType: locationType,
      });
      handleRoute(value, locationType);
    }
  };

  function del(input) {
    if (input == "origin") {
      setLocationInput({
        ...locationInput,
        valueOrigin: "",
      });
    } else {
      setLocationInput({
        ...locationInput,
        valueDestination: "",
      });
    }
  }
  return (
    <div
      className={cn("container", {
        "card-open": suggestionsArray.isOpen,
        "card-closed": !suggestionsArray.isOpen,
      })}
    >
      <div className={style["card-container"]}>
        {!location.permission && (
          <div className={style["location-list"]}>
            <div className={style["row-list"]}>
              <LocationDisabled className={style["place-svg"]} />
              <div className={style["col-list"]}>
                <p className={style["text-1-list"]}>Localização desabilitada</p>
                <p className={style["text-2-list"]}>Por favor ative</p>
              </div>
              <div id="rig"></div>
            </div>
          </div>
        )}

        <div className={style.card}>
          <div className={style["card--header"]}>
            <div className={style.media}>
              <div className={style["media--body"]}>
                <div className={style.avatar}>
                  <Image className={style["img-1"]} alt="" src={avatar} />
                </div>
                <div className={style["media--content"]}>
                  <p className={style["text-2"]}>Savannah Nguyen</p>
                  <div className={style["message"]}>
                    <Icon name="message" />
                    <Icon className={style.message} name="notification" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style["input--origem"]}>
            <div className={style["address--conteiner-origem"]}>
              <Icon
                className={style["svgorigin--destino"]}
                name="originDestination"
              />
              <div className={style["address"]}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <input
                    className={style["input--address"]}
                    placeholder="De Onde?"
                    onChange={(e) =>
                      handleInputChange("origin", e.target.value)
                    }
                    value={locationInput.valueOrigin}
                    ref={locationRef}
                  />
                  <IconButton onClick={() => del("origin")}>
                    <CancelOutlined />
                  </IconButton>
                </div>
                <div
                  style={{
                    borderTopColor: "gray",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    width: "100%",
                    marginBlock: "10px",
                    height: "1px",
                  }}
                />
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <input
                    className={style["input--address"]}
                    placeholder="Para onde?"
                    ref={destinationRef}
                    onChange={(e) =>
                      handleInputChange("destination", e.target.value)
                    }
                    value={locationInput.valueDestination}
                  />

                  <IconButton onClick={() => del("destination")}>
                    <CancelOutlined />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>

          {suggestionsArray?.isOpen &&
            suggestionsArray.suggestions.map((suggestion, index) => (
              <List
                handleSetOrigem={handleSetOrigem}
                suggestion={suggestion}
                index={index}
                input={suggestionsArray.input}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
