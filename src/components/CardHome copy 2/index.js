import React, { useCallback, useState } from "react";
import styles from "./Card.module.sass";
import CadTop from "./CadTop";
const avatar = require("../../images/avatar.jpg");
import CardService from "../CardService";
import List from "../List";
import Servico from "../Servico";
import Tables from "@/components/Tables";
import Icon from "../Icon";
import { CancelOutlined, CloseFullscreen } from "@mui/icons-material";
import OriginDestination from "./OriginDestination";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { IconButton } from "@mui/material";
import Map2 from "@/pages/home/components/Map2/index copy";
import CardForm from "../CardForm";
import { ApplePayLight } from "../ApplePayLight/ApplePayLight";
export default function index({
  handleService,
  service,
  config,
  user,
  latitude,
  longitude,
  myLocation,
  setNewLocation,
  height,
  formHeight,
}) {
  const [suggestionsArray, setSuggestionsArray] = useState({
    suggestions: [],
    isOpen: false,
    input: "",
  });

  const { step, isOpen } = service;

  function handleOpen(e) {
    handleService({
     isOpen: !isOpen,
    });
  }

  return (
    <>
   
  
    </>
  );
}
