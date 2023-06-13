import NavBar from "./nav-bar";
import ServicesCard from "./services-card";
import CardDetails1 from "./card-details1";
import CardDetail2 from "./card-detail2";
import styles from "./Service.module.sass";
import useHandleConfig from "@/hooks/useConfig";
import { Button, IconButton } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const Servico = () => {
  const { config } = useHandleConfig();


  return (
    <div className={styles.servico}>





   

        {config.reverse().map((item, key) =>

            <ServicesCard config={item} key={key} />



        )}



      <div className={styles.footer}>

        <div className={styles.content}>
        
         <IconButton>
          <KeyboardBackspaceIcon/>
          </IconButton>

        </div>

        <div className={styles.button}>
          <Button>Escolha o serviço</Button>
        </div>

      </div>

    </div>

  );
};

export default Servico;
