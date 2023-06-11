import Image from "next/image";
import { memo } from "react";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import styles from "./services-card.module.sass";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
const ServicesCard = memo((props) => {
  const { config } = props

  console.log(config)

  return (
    <div className={styles.service_card}>

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
          <b >{config?.description}</b>

          <p>
            {config?.detalhes}
          </p>

         
        </div>
      </div>
  
  
    </div>

  );
});

export default ServicesCard;
