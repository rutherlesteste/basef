import React from "react";
import styles from "./List.module.sass";
import Icon from "../Icons";
import { ListItem, ListItemLabel, MenuAdapter, ARTWORK_SIZES } from "baseui/list";
import { Check, ChevronRight } from "baseui/icon";
import { StatefulMenu } from 'baseui/menu';
import { PinDropTwoTone } from "@mui/icons-material";
import Image from "next/image";


export default function RenderRow(props) {

  const { icon, label ,text} = props

  return (





    <div className={styles['fav']}>
      <div className={styles['cart']}>
        <div className={styles['home']}>

          <Image src={icon} className={styles['icon']} />
        </div>
        <div className={styles['contetn']}>
          <span className={styles['text']}>{label}</span>
          <span className={styles['text1']}>{
            text
          }</span>
        </div>
      </div>
    </div>






  );
}
