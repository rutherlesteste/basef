import { Add, HomeTwoTone, Remove } from "@mui/icons-material";
import React, { memo } from "react";
import styles from "./card-detail2.module.sass";
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import { Divider, FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Image from "next/image";
const CardDetail2 = memo(() => {
  const [home, setHome] = React.useState('')
  const [andar,setAndar] = React.useState()
  return (


    <div className={styles.card_details}>


      <div className={styles.container_details}>


        <div className={styles.row_details}>
          <div className={styles.icon}>
            <HomeTwoTone />
          </div>
          <div className={styles.label}>

            {home != 'ap' && (
              <>
                <input onClick={(e) => setHome(e.target.id)} type='radio' id='casa' name='home' />
                <label htmlFor="casa">Casa</label>
              </>
            )}
            <input type='radio' id='ap' onClick={(e) => setHome(e.target.id)} name='home' />
            <label htmlFor="ap">Apartamento</label>

            {
              home == 'ap' && (
                <>
                  <input type='checkbox' id='elevador' value={'elevador'} name='elevador' />
                  <label htmlFor="elevador">Elevador</label>

                  <input onChange={(e)=>setAndar(e.target.value)} placeholder="andar" type='number' maxLength={3}  value={andar}  />
                </>
              )
            }



          </div>

          <div className={styles.icon}>
            <IconButton onClick={()=> setHome("")}>
            <CancelOutlinedIcon sx={{color:"gray" , width:18 , height:18}} />
            </IconButton>
          </div>

        </div>


        <div className={styles.row_details}>
          <div className={styles.icon}>
            <CallOutlinedIcon


            />
          </div>
          <div className={styles.label}>
            <input type={'text'} placeholder={'Telefone'} />
          </div>
    
        </div>

        <div className={styles.row_details}>
          <div className={styles.icon}>
            <EditNoteTwoToneIcon


            />
          </div>
          <div className={styles.label}>
            <input type={'text'} placeholder={'Descrição dos itens'} />
          </div>
    
        </div>


      </div>
    </div>
  );
});

export default CardDetail2;
