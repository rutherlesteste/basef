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

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Icon from "../Icon";
import { CancelOutlined, CloseFullscreen, CloseRounded, LocationDisabledOutlined } from "@mui/icons-material";
import OriginDestination from "./OriginDestination";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { IconButton } from "@mui/material";
import Map2 from "@/pages/home/components/Map2/index copy";
import CardForm from "../CardForm";
import Imput from './input'
import cn from 'classnames'
import Paper from '@mui/material/Paper';
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



  const Item = styled(Paper)(({ theme }) => ({


    color: theme.palette.text.secondary,
    height: 'auto',

  }));

  return (
    <>




      <Item elevation={3} ref={divRef} data-step={2} data-isopen={true} className={cn(styles.card)}>











        <OriginDestination
          step={step}
          service={service}
          handleService={handleService}
          handleOpen={handleOpen}
          handleClose={handleClose}
          app={app}






        />
















      </Item>

    </>
  );
}
