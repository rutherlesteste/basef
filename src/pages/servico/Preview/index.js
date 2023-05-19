import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import React from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import { formatPrice } from "../../../utils";

const Preview = ({
  setVisiblePreview,
  setVisibleSchedule,
  visible,
  onClose,
  valorFinal,
  PostServicos,
  PostAgendar,
  config,
  pedido,
}) => {
  return (
    <div className={cn(styles.preview, { [styles.visible]: visible })}>
      <button className={styles.close} onClick={onClose}>
        <Icon name="close" size="24" />
      </button>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title={pedido.servico}
        classTitle="title-blue"
      >
        <div className={styles.body}>
          <div className={styles.photo}>
            <img src={pedido.image} alt="Product" />
          </div>

          <div className={styles.title}>{pedido.origem}</div>
          <div className={styles.title}>{pedido.end}</div>

          <div className={styles.line}>
            <div className={styles.text}>
              <span>Valor total</span>
            </div>
            <div className={styles.price}>{formatPrice(valorFinal)}</div>
          </div>
          <div className={styles.user}>
            <div className={styles.avatar}></div>
          </div>
        </div>
        <div className={styles.btns}>
          <button
            onClick={() => {
              setVisibleSchedule(true);
              setVisiblePreview(true);
            }}
            className={cn("button-stroke", styles.button)}
          >
            Agendar
          </button>
          <button
            onClick={() => PostServicos()}
            className={cn("button", styles.button)}
          >
            Solicitar Agora
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Preview;
