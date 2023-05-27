import React, { useCallback, useState } from 'react'
import styles from './Card.module.sass'
import CadTop from './CadTop'
const avatar = require("../../images/avatar.jpg");
import CardService from "../CardService";
import List from "../List";
import Servico from "../Servico";
import Tables from '@/components/Tables'
import Icon from '../Icon';
import { CancelOutlined, CloseFullscreen } from '@mui/icons-material';
import OriginDestination from './OriginDestination'
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { IconButton } from '@mui/material';
export default function index({
  handleService,
  service,
  config,
  user,
  latitude,
  longitude,
  myLocation 
}) {

  const [suggestionsArray, setSuggestionsArray] = useState({ suggestions: [], isOpen: false, input: "" });
 

  const { step , isOpen} = service


  function handleOpen(e){




       handleService({
         ...service,
         isOpen: !isOpen
       })


  
     }
  
  




  return (
    <>


      <div


      
       className={
        styles["card-container"]
      }>


        <div data-isopen={isOpen}
       
          className={
            styles["card"]
          }>

          <div   className={
            styles["front-content"]
          
          }
          
          >

            <CadTop  myLocation={myLocation}
              avatar={avatar} handleOpen={handleOpen} />
          </div>


          <div  className={
            styles["content"]
          }>
            <div className={
              styles["heading"]
            }>
              <Tables />
              <IconButton onClick={handleOpen}>
              <CancelSharpIcon />
              </IconButton>
            </div>

            <OriginDestination handleService={handleService} service={service} />


           </div>
        </div>
      </div>
    </>
  )
}
