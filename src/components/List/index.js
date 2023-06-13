import React from "react";
import styles from "./List.module.sass";
import Icon from "../Icons";
import { ListItem, ListItemLabel ,MenuAdapter,ARTWORK_SIZES} from "baseui/list";
import { Check, ChevronRight } from "baseui/icon";
import {StatefulMenu} from 'baseui/menu';
import { PinDropTwoTone } from "@mui/icons-material";


export default function RenderRow({ suggestion, handleSetOrigem ,index }) {
  if (!suggestion) {
    return null;
  }



  const neighborhood =
    suggestion?.properties?.context?.neighborhood?.name
      " " || "";
  const place =
    suggestion?.properties?.context?.place?.name + " " || "";
  const region =
    suggestion?.properties?.context?.region?.name ||
    "Endereço não encontrado";

  return (



  

<div key={index} onClick={()=> handleSetOrigem(suggestion)} className={styles['fav']}>
        <div className={styles['cart']}>
          <div className={styles['home']}>
            <svg viewBox="0 0 1024 1024" className={styles['icon']}>
              <path d="M512 490q44 0 75-31t31-75-31-75-75-31-75 31-31 75 31 75 75 31zM512 86q124 0 211 87t87 211q0 62-31 142t-75 150-87 131-73 97l-32 34q-12-14-32-37t-72-92-91-134-71-147-32-144q0-124 87-211t211-87z"></path>
            </svg>
          </div>
          <div className={styles['contetn']}>
            <span className={styles['text']}>{suggestion?.properties?.name || "Endereço inválido"}</span>
            <span className={styles['text1']}>{
          neighborhood != "undefined "
            ? neighborhood
            : "" + place != "undefined "
            ? place
            : "" + region != "undefined "
            ? region
            : ""
        }</span>
          </div>
        </div>
      </div>



    


  );
}
