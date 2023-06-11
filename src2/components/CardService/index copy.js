import React, { useState } from "react";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import style from "./Card.module.sass";
import { Divider } from "@mui/material";
import { formatPrice } from "@/utils";

const CardService = ({ config, handleService, distance, service }) => {
console.log(config)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    justifyContent: "space-around",
    alignItems: "center",
  }));

  const valor = (id, value_km, value_base, value_helpers, value_hours) => {
    if (id == 3) {
      return distance < 6 ? 9 : distance * value_km;
    } else if (id == 1) {
      return value_base + distance * value_km + 1 * value_helpers;
    } else {
      return (
        value_hours * 3 +
        1 * value_helpers +
        1 * value_hours
      );
    }
  };

  function updateService(
    id,
    servico,
    image,
    preco,
    helpers,
    hours,
    value_helpers,
    value_hours
  ) {
    handleService({
      ...service,
      id,
      servico,
      image,
      value: preco,
      preco: preco,
      helpers,
      hours,
      value_helpers,
      value_hours,
    });

    console.log(service);
  }

  return (
    <div className={"container"}>
      <div className={style["card-container"]}>
        <Item
          onClick={() =>
            updateService(
              config.id,
              config.service,
              config.image,
              valor(
                config.id,
                config.value_km,
                config.value_base,
                config.value_helpers,
                config.value_hours
              ),
              config.helpers,
              config.hours,
              config.value_helpers,
              config.value_hours
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
                  <span>{distance} Km</span>
                </div>
              )}
            </div>
          </Stack>
        </Item>
      </div>
    </div>
  );
};

export default CardService;
