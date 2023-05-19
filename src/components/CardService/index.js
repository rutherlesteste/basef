import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";

import style from "./Card.module.sass";
import { Divider } from "@mui/material";
import { formatPrice } from "@/utils";
import { setService } from "@/context/serviceSlice";

const avatar = require("../../images/image-freteme-truck.png");

const Card = ({ config }) => {
  const [suggestionsArray, setSuggestionsArray] = useState({
    suggestions: [],
    isOpen: false,
    input: "",
  });

  const service = useSelector((state) => state.service.service);
  const distance = service.distance;

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

  const valor = (
    id,
    value_km,
    value_base,
    value_helpers,
    value_mounters,
    value_hours
  ) => {
    if (id == 3) {
      return distance < 6 ? 9 : distance * value_km;
    } else if (id == 1) {
      return (
        value_base +
        distance * value_km +
        service.helpers * value_helpers +
        service.mounters * value_mounters
      );
    } else {
      return (
        value_hours * 3 +
        service.helpers * value_helpers +
        service.mounters * value_mounters +
        service.hours * value_hours
      );
    }
  };

  function handleService(id, servico, image, preco) {
    dispatch(
      setService({
        ...service,
        id,
        servico,
        image,
        value: preco,
      })
    );

    console.log(service);
  }

  return (
    <div
      className={cn("container", {
        "card-open": suggestionsArray.isOpen,
        "card-closed": !suggestionsArray.isOpen,
      })}
    >
      <div className={style["card-container"]}>
        <Item
          onClick={() =>
            handleService(
              config.id,
              config.service,
              config.image,
              formatPrice(
                valor(
                  config.id,
                  config.value_km,
                  config.value_base,
                  config.value_helpers,
                  config.value_mounters,
                  config.value_hours
                )
              )
            )
          }
          className={style.card}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <div className={style.avatar}>
              <img src={config.image} />
            </div>

            <div className={style.preco}>
              <div className={style["text-3"]}>
                <span>{config.service}</span>
              </div>
              <div>
                <span>
                  {formatPrice(
                    valor(
                      config.id,
                      config.value_km,
                      config.value_base,
                      config.value_helpers,
                      config.value_mounters,
                      config.value_hours
                    )
                  )}
                </span>
              </div>
            </div>

            <div className={style["message"]}>
              {config.hours > 0 && (
                <div>
                  <AccessTimeTwoToneIcon />
                  <span>{config.hours}h</span>
                </div>
              )}

              {config.helpers > 0 && (
                <div>
                  <PersonAddAltTwoToneIcon />
                  <span>{config.helpers}</span>
                </div>
              )}
              {config.value_km > 0 && (
                <div>
                  <AddRoadTwoToneIcon />
                  <span>{service.distance} Km</span>
                </div>
              )}
            </div>
          </Stack>
        </Item>
      </div>
    </div>
  );
};

export default Card;
