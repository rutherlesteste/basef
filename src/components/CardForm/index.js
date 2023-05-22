import React from "react";
import cn from "classnames";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import Stack from "@mui/material/Stack";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import styles from "./Card.module.sass";
import { Divider } from "@mui/material";
import Card from "../Cards";
import { formatPrice } from "@/utils";

const CardForm = ({ service }) => {
  return (
    <div className={cn("container")}>
      <Card className={styles.card}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          justifyContent="space-between"
          width="100%"
        >
          <div className={styles.avatar}>
            <img src={service.image} alt="Service Image" />
          </div>

          <div className={styles.preco}>
            <div className={styles["text-3"]}>
              <span>{service.servico}</span>
            </div>
            <div>
              <span>{formatPrice(service.preco)}</span>
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
      </Card>
    </div>
  );
};

export default CardForm;
