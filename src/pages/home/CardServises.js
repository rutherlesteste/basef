import NavBar from "../../components/Services/nav-bar";
import ServicesCard from "../../components/Services/services-card";
import CardDetails1 from "../../components/Services/card-details1";
import CardDetail2 from "../../components/Services/card-detail2";
import styles from "./CardServices.module.sass";
import useHandleConfig from "@/hooks/useConfig";
import { Button } from "@mui/material";
const Servico = () => {
  const { config } = useHandleConfig();


  return (

    <div data-isopen={true} className={styles.servico}>

      <NavBar />

      <div className={styles.containerServices}>

        {config.reverse().map((item, key) =>

          <div className={styles.services} key={key}>
            <ServicesCard config={item} />
          </div>


        )}
      </div>

      <div className={styles.body}>
        <CardDetails1 />
        <CardDetail2 />
      </div>

      <div className={styles.footer}>
        <div className={styles.content}>
          <p>R$ 89.00</p>
          <span>Moto frete</span>
        </div>
        <div className={styles.button}>
          <Button>Solicitar</Button>
        </div>
      </div>

    </div>

  );
};

export default Servico;
