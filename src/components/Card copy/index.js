// 请确认安装了classnames
import classnames from "classnames";
import React from "react";
import cn from "classnames";
import style from "./Card.module.sass";
import Image from "next/image";
const avatar = require("../../images/avatar.jpg");
import Icon from "../Icons";
import Divider from "@mui/material/Divider";
import List from "../List";
const Card = () => {
  return (
    <div className={"container"}>
      <div className={style["card-container"]}>
        <div className={style["location-list"]}>
          <div className={style["row-list"]}>
            <Icon name="pinLocation" className={style["place-svg"]} />
            <div className={style["col-list"]}>
              <p className={style["text-1-list"]}>
                Kings Cross Underground Statio...
              </p>
              <p className={style["text-2-list"]}>New York</p>
            </div>
            <div id="rig">
              <Icon name="rig" />
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style["card--header"]}>
            <div className={style.media}>
              <div className={style["media--body"]}>
                <div className={style.avatar}>
                  <Image className={style["img-1"]} src={avatar} />
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
                <input
                  className={style["input--address"]}
                  placeholder="De Onde?"
                />
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

                <input
                  className={style["input--address"]}
                  placeholder="Para Onde?"
                />
              </div>
            </div>
          </div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Card;
