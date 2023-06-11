import { Add, Remove } from "@mui/icons-material";
import { memo } from "react";
import styles from "./card-detail2.module.sass";
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import { Divider } from "@mui/material";
import Image from "next/image";
const CardDetail2 = memo(() => {
  return (


    <div className={styles.card_details}>


      <div className={styles.container_details}>


        <div className={styles.row_details}>
          <div className={styles.icon}>
            <GroupAddTwoToneIcon

              alt=""
              src="/vuesaxlinearwallet3.svg"
            />
          </div>
          <div className={styles.label}>
            <p>{'1 ' }Ajudantes</p>
          </div>
          <div className={styles.soma}>
            <div className={styles.btn_soma}>
              <button>
                <Remove />
              </button>

              <button>
                <Add />
              </button>

            </div>
          </div>
        </div>


        <div className={styles.row_details}>
          <div className={styles.icon}>
            <AccessTimeTwoToneIcon


            />
          </div>
          <div className={styles.label}>
            <p> 1 Horas</p>
          </div>
          <div className={styles.soma}>
            <div className={styles.btn_soma}>
              <button>
                <Remove />
              </button>

              <button>
                <Add />
              </button>

            </div>
          </div>
        </div>


        <div className={styles.location}>
          <div className={styles.location_content}>
            <div className={styles.icon}>

              <Image width={30} height={80} alt='' src={require('../../images/location.svg')} />

            </div>

            <div className={styles.location_destination}>

              <input type={'text'} value="rua maria de belem" />
              <input type={'text'} value="rua maria de belem" />
            </div>

            <div className={styles.location_destination}>

              <button>editar</button>
              <button>editar</button>
            </div>



          </div>


        </div>
      </div>
    </div>
  );
});

export default CardDetail2;
