import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMaps } from "@/context/locationSlice";
import { debounce } from "lodash";
import cn from "classnames";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import Servicos from "../Servicos";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";

import style from "./Card.module.sass";
import Image from "next/image";
import Icon from "../Icons";
import useGetRoute from "@/utils/getRouter";
import List from "../List";
import { Cancel, CancelOutlined, LocationDisabled } from "@mui/icons-material";
import getDistance from "@/utils/getDistance";
import { Badge, Chip, Divider, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const avatar = require("../../images/image-freteme-truck.png");

const Card = () => {
  const [suggestionsArray, setSuggestionsArray] = useState({
    suggestions: [],
    isOpen: false,
    input: "",
  });

  const location = useSelector((state) => state.location.value);

  const maps = useSelector((state) => state.location.maps);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    justifyContent: "space-around",
    alignItems: "center",
  }));

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
        <div className={style.card}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            justifyContent={"space-around"}
          >
            <div className={style.avatar}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<span>teste</span>}
              >
                <Avatar
                  srcSet={"../../images/avatar.jpg"}
                  sx={{ width: 56, height: 56 }}
                />
              </Badge>
            </div>

            <div className={style.preco}>
              <div className={style["text-2"]}>
                <span>R$32.50</span>
              </div>
            </div>

            <div className={style["message"]}>
              <div>
                <AccessTimeTwoToneIcon />
                <span>5h</span>
              </div>
              <div>
                <PersonAddAltTwoToneIcon />
                <span>1</span>
              </div>
              <div>
                <AddRoadTwoToneIcon />
                <span>250</span>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Card;
