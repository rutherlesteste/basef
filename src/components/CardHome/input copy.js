import React, { useEffect, useMemo, useState } from 'react'
import style from './Imput.module.sass'
import { IconButton } from '@mui/material'
import { CancelOutlined } from '@mui/icons-material'
import Icon from '../Icon'
import Image from 'next/image'
const originDestination = require('../../images/originDestination.svg')


export default function Input(props) {

const {handleOpen,myLocation} = props


 

 const myLoc = useMemo(() =>  myLocation
 , [myLocation])
  



  return (
    <div  className={style["input--origem"]}>
    <div className={style["address--conteiner-origem"]}>
      <Image alt=""
        className={style["svgorigin--destino"]}
       src={originDestination}
      />
      <div className={style["address"]}>
        <div
            onClick={handleOpen}
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
          }}
         
        >
          <input
        
            className={style["input--address"]}
            placeholder="De Onde?"
            disabled
           
            value={myLoc}
      
          />
          <IconButton >
            <CancelOutlined />
          </IconButton>
        </div>
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
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
          }}
        >
         

        </div>
      </div>
    </div>
  </div>
  )
}
