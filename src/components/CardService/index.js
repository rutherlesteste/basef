import * as React from "react";
import {
  MessageCard,
  BUTTON_KIND,
  BACKGROUND_COLOR_TYPE,
  IMAGE_LAYOUT
} from "baseui/message-card";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import style from "./Card.module.sass";
import { Divider } from "@mui/material";
import { formatPrice } from "@/utils";


export default ({ config, handleService, distance, service }) => {

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



    <MessageCard
            heading="Looking for adventure?"
            paragraph="Nam vitae maximus nibh."
            buttonLabel="Take me there"
    
      onClick={() => alert('Clicked 🙂')}
      image={{
        src: config.image,
        layout: IMAGE_LAYOUT.trailing,

        ariaLabel:
          'A deconstructed hamburger being literally thrown together',
      }}

      backgroundColorType={BACKGROUND_COLOR_TYPE.light}

      overrides={{
        Image: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.warning600} solid`,
            backgroundColor: $theme.colors.warning600,
            
          })
        }
      }}
    />




    </div>
    </div>
  );
}