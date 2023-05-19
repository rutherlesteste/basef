import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMaps } from "@/context/locationSlice";
import { debounce } from "lodash";
import cn from "classnames";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import styles from "./Card.module.sass";
import Icon from "../Icons";
import useGetRoute from "@/utils/getRouter";
import { Divider } from "@mui/material";
import Card from "../Cards";

const avatar = require("../../images/image-freteme-truck.png");

const Cards = ({ service, children }) => {
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
  const ariaLabel = { "aria-label": "description" };
  const locationRef = useRef(null);
  const destinationRef = useRef(null);
  const [locationInput, setLocationInput] = useState({
    origin: "",
    destination: "",
    valueOrigin: "",
    valueDestination: "",
    inputType: "",
  });

  return (
    <div className={cn("container")}>
      <Card className={styles.card}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <div className={styles.avatar}>
            <img src={service.image} />
          </div>

          <div className={styles.preco}>
            <div className={styles["text-3"]}>
              <span>{service.servico}</span>
            </div>
            <div>
              <span>{service.value}</span>
            </div>
          </div>

          <div className={styles["message"]}>
            <div>
              <AccessTimeTwoToneIcon />
              <span>{service.hours}h</span>
            </div>
            <div>
              <PersonAddAltTwoToneIcon />
              <span>{service.helpers}</span>
            </div>
            <div>
              <AddRoadTwoToneIcon />
              <span>{service.distance}km</span>
            </div>
          </div>
        </Stack>

        {children}
      </Card>
    </div>
  );
};

export default Cards;
