import Image from "next/image";
import { memo } from "react";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import styles from "./services-card.module.sass";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
const ServicesCard = memo((props) => {
  const { config, key } = props

  console.log(config)

  return (
    <div key={config.id} className={styles.service_card}>

      <div className={styles.header}>
        <div className={styles.image_service}>
          <Image
            width={78}
            height={76}
            alt=""
            src={config?.image2}
          />
        </div>
        <div className={styles.detaills}>
          <div className={styles.row}>

            <b>{config?.description}</b>
            <b>R$ 8.00</b>
          </div>


          <div className={styles.row}>

            <p>
              {config?.detalhes}
            </p>


            <div className={styles.icons}>
                <div>{config?.id != 3 && <><PeopleAltOutlinedIcon/> <span>{config?.helpers}</span> </>  }</div>
                <div>{config?.id == 2 && <><AccessTimeOutlinedIcon/> <span>{config?.hours}</span> </>  }</div>          
            </div>

          </div>



        </div>
      </div>


    </div>

  );
});

export default ServicesCard;
