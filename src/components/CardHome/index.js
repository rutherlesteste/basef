import React, { useCallback, useEffect, useRef, useState } from "react";
import Cards from '../Cards'
import styles from "./CardHome.module.sass";
import CadTop from "./CadTop";
const avatar = require("../../images/avatar.jpg");
import LaunchIcon from '@mui/icons-material/Launch';
import CardService from "../CardService";
import List from "../List";
import Servico from "../Servico";
import Tables from "@/components/Tables";
import Icon from "../Icon";
import { CancelOutlined, CloseFullscreen, CloseRounded, LocationDisabledOutlined } from "@mui/icons-material";
import OriginDestination from "./OriginDestination";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { IconButton } from "@mui/material";
import Map2 from "@/pages/home/components/Map2/index copy";
import CardForm from "../CardForm";
import Imput from './input'
import cn from 'classnames'
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

  const { isOpen, step } = app


  useEffect(() => {

    if (divRef.current) {

      const { clientWidth, clientHeight } = divRef.current;

      handleApp({ cardHeight: clientHeight })
    }
  }, [divRef, isOpen]);




  return (


    <div className={styles.master}>
      <div className={styles.notifications} >
        <div className={styles.block}>

          <div className={styles.header_card2}>
            <h3 className={cn(styles.text1, "h3")}>
              Para ter uma melhor experiencia

            </h3>

            <span className={cn(styles.text1, "title-1")}>
              Por favor ative a permissção da localização

            </span>

          </div>

          <div>
            <div className={cn(styles.btn)}>
              <span>Compartilhar</span>
              <LocationDisabledOutlined />
            </div>
          </div>

          <div className={styles.content_close}>

           
              <IconButton>
                <CloseRounded />
              </IconButton>
        

          </div>
        </div>


      </div>

      <div className={styles.div_content}>

      </div>


      <Cards className={cn(styles.services)}


      >




        <Cards ref={divRef} data-step={2} data-isopen={true} className={styles['card']}>


          {isOpen && (<Tables service={service} handleApp={handleApp} />)}



          {1 == 1 && (<OriginDestination
            step={step}
            service={service}
            handleService={handleService}
            handleOpen={handleOpen}
            handleClose={handleClose}
            app={app}


          />)}
          {2 == 3 && true && (<div className={styles.card_services}> <Service handleApp={handleApp} app={app} config={config} service={service} handleService={handleService} /> </div>
          )}



          {

            /*
            
            <div onClick={()=> isOpen? handleClose() : handleOpen() } className={styles.close}>
              {isOpen?(<CloseRounded/>) : <LaunchIcon/> }
              
              </div>
            
              */
          }








        </Cards>




      </Cards>

    </div>
  );
}
