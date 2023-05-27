import React from 'react'
import styles from './CardHeader.module.sass'
import Image from 'next/image'
import { NotificationAddTwoTone } from '@mui/icons-material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import InputOrigem from './input';
import { debounce } from "lodash";
import cn from "classnames";


export default function CadTop(props) {
  const {avatar,myLocation,handleOpen} = props
  return (
 
    <div id="card-header" className={styles["card-header"]}>
    <div className={styles.col}>    
    <div className={styles.divider} />
    <div id="media" className={styles["media"]}>
      <div id="media-body" className={styles["media-body"]}>
        <div id="avatar" className={styles["avatar"]}>
          <Image
            id="avatar2"
            className={styles["avatar2"]}
            src={avatar}
           
          />
        </div>
        <div id="media-content" className={styles["media-content"]}>
          <div id="frankesteban" className={styles["frankesteban"]}>
            Alexandro Vargas
          </div>
          <div id="webdevelopment" className={styles["webdevelopment"]}>
            Ayer 23:50
          </div>
        </div>
      </div>
      <div id="media-option" className={styles["media-option"]}>
      <NotificationsNoneOutlinedIcon className={styles["carbon:overflow-menu-vertical"]}/>
      </div>


    </div>

    <InputOrigem handleOpen={handleOpen} myLocation={myLocation} />
    
    
    </div>

  </div>
  

  )
}
