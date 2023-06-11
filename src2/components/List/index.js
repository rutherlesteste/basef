import React from "react";
import style from "./List.module.sass";
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
    <div key={index} className={style.search} onClick={()=> handleSetOrigem(suggestion)}>
    
    <MenuAdapter>
    <ListItem
   
    artworkSize={ARTWORK_SIZES.LARGE}
    


      artwork={(props) =>  <PinDropTwoTone sx={{width: '25px', height:'25px'}} />}
      endEnhancer={() => <ChevronRight />}

      overrides={{
        Content: {
          style: ({ $theme }) => ({
        

            textAlign: "left"
          })
        },
        
      }}
    >
      <ListItemLabel
        description={
          neighborhood != "undefined "
            ? neighborhood
            : "" + place != "undefined "
            ? place
            : "" + region != "undefined "
            ? region
            : ""
        }
      >
        {suggestion?.properties?.name || "Endereço inválido"}
      </ListItemLabel>
    </ListItem>
    </MenuAdapter>
    </div>
  );
}
