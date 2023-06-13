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
import ButtonNavigation from '../BottonNavigation'

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Icon from "../Icon";
import { CancelOutlined, CloseFullscreen, CloseRounded, LocationDisabledOutlined } from "@mui/icons-material";
import OriginDestination from "./OriginDestination";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { Button, IconButton } from "@mui/material";
import Map2 from "@/pages/home/components/Map2/index copy";
import CardForm from "../CardForm";
import Imput from './input'
import cn from 'classnames'
import Paper from '@mui/material/Paper';
//import Service from '../CardService/Service'
import CardNotification from '../CardNotification'
import Service from '../Services'
import { fontSize } from "@mui/system";


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



  const Item = styled(Paper)(({ theme }) => ({


    color: '#ffff',
    height: 'auto',

  }));

  return (
    <>


      <Item elevation={3} className={styles.notifications} >
        <div className={styles.block}>

          <div className={styles.header_card2}>
            <span>
              Para ter uma melhor experiencia

            </span>

            <p>
              Por favor ative a permissção da localização

            </p>

          </div>


          <Button size="medium" sx={{ borderRadius: 20, backgroundColor: '#fff', color: '#3070f7', fontSize: 13 }} variant="contained"  >
            Permitir
          </Button>


          <div className={styles.content_close}>


            <IconButton>
              <CloseRounded />
            </IconButton>


          </div>
        </div>

      </Item>

      <Item elevation={3} ref={divRef} data-step={2} data-isopen={true} className={cn(styles.card)}>










        {1 == 1 && (
          <OriginDestination
            step={step}
            service={service}
            handleService={handleService}
            handleOpen={handleOpen}
            handleClose={handleClose}
            app={app}


          />


        )}
        {2 == 3 && true && (<div className={styles.card_services}> <Service handleApp={handleApp} app={app} config={config} service={service} handleService={handleService} /> </div>
        )}










        <div className={styles.tab}>

          <ButtonNavigation />
        </div>


      </Item>

    </>
  );
}
