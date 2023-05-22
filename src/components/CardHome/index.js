import React, { useRef, useState } from "react";
import CardService from "../CardService";
import style from "./Card.module.sass";
import Image from "next/image";
import Icon from "../Icons";
import useGetRoute from "@/utils/getRouter";
import { setService } from "@/context/serviceSlice";
import List from "../List";
import { CancelOutlined, LocationDisabled } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CardForm from "../CardForm";
import Servico from "../Servico";
import { debounce } from "lodash";
import cn from "classnames";

const avatar = require("../../images/avatar.jpg");

const CardHome = ({
  handleService,
  service,
  step,
  config,
  user,
  latitude,
  longitude,
}) => {
  const [suggestionsArray, setSuggestionsArray] = useState({
    suggestions: [],
    isOpen: false,
    input: "",
  });

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
    if (locationInput.inputType === "origin") {
      setLocationInput({
        ...locationInput,
        valueOrigin: data.place_name,
      });

      handleService({
        originPlace: data.place_name,
        origin: [data.center[0], data.center[1]],

        makers: [
          {
            coordinates: [data.center[0], data.center[1]],
            place: data.place_name,
            type: "origin",
          },
        ],
      });

      setSuggestionsArray({
        ...suggestionsArray,
        suggestions: [],
        isOpen: false,
      });

      destinationRef.current.focus();
    } else {
      setLocationInput({
        ...locationInput,
        valueDestination: data.place_name,
      });

      setSuggestionsArray({
        ...suggestionsArray,
        suggestions: [],
        isOpen: false,
      });

      handleService({
        destinationPlace: data.place_name,
        destination: [data.center[0], data.center[1]],
      });
    }
  };

  const handleInputChange = (locationType, value) => {
    if (locationType === "origin") {
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

  const del = (input) => {
    if (input === "origin") {
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
  };

  return (
    <div
      className={cn("container", {
        "card-open": suggestionsArray.isOpen,
        "card-closed": !suggestionsArray.isOpen,
      })}
    >
      <div className={style["card-container"]}>
        {step === 1 && (
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
        )}

        {step === 2 &&
          config?.map((config, index) => (
            <div key={index} style={{ padding: "3%", width: "100%" }}>
              <CardService config={config} />
            </div>
          ))}

        {step === 3 && (
          <div style={{ padding: "3%", width: "100%" }}>
            <Servico config={config} />
          </div>
        )}

        {suggestionsArray.isOpen &&
          suggestionsArray.suggestions.map((suggestion, index) => (
            <List
              key={index}
              handleSetOrigem={handleSetOrigem}
              suggestion={suggestion}
              index={index}
              input={suggestionsArray.input}
            />
          ))}
      </div>
    </div>
  );
};

export default CardHome;
