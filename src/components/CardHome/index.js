import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Card.module.sass";
import CadTop from "./CadTop";
const avatar = require("../../images/avatar.jpg");
import LaunchIcon from '@mui/icons-material/Launch';
import CardService from "../CardService";
import List from "../List";
import Servico from "../Servico";
import Tables from "@/components/Tables";
import Icon from "../Icon";
import { CancelOutlined, CloseFullscreen, CloseRounded } from "@mui/icons-material";
import OriginDestination from "./OriginDestination";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { IconButton } from "@mui/material";
import Map2 from "@/pages/home/components/Map2/index copy";
import CardForm from "../CardForm";
import Imput from './input'
//import Service from '../CardService/Service'
import CardNotification from '../CardNotification'
import Service from '../Services'

export default function Index({
  handleService,
  service,
  config,
  app,
  user,
  latitude,
  longitude,
  myLocation,
  setNewLocation,
  height,
  formHeight,
  handleOpen,
  handleClose,
  handleApp

}) {
  const [suggestionsArray, setSuggestionsArray] = useState({
    suggestions: [],
    isOpen: false,
    input: "",
  });


  const divRef = useRef()

  const{isOpen,step} = app


  useEffect(() => {

    if (divRef.current) {
     
      const { clientWidth, clientHeight } = divRef.current;

      handleApp({cardHeight:clientHeight})
    }
  }, [divRef,isOpen]);




  return (


<>



    <div ref={divRef} data-step={2}  data-isopen={true} className={styles['card']}>


{isOpen &&(    <Tables service={service} handleApp={handleApp} />)}



     { 2 == 1 &&( <OriginDestination
      step={step}
      service={service}
      handleService={handleService}
      handleOpen={handleOpen}
      handleClose={handleClose}
      app={app}
      
      
      />)}
    { 2 == 2 && true &&( <Service handleApp={handleApp} app={app} config={config} service={service} handleService={handleService}  />
)}
  
  <div onClick={()=> isOpen? handleClose() : handleOpen() } className={styles.close}>
  {isOpen?(<CloseRounded/>) : <LaunchIcon/> }
  
  </div>

<div className={styles.sss} />




  </div>




 </>
 );
}
