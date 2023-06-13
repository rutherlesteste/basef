import { memo } from "react";
import styles from "./card-detail2.module.sass";
const CardDetail2 = memo(() => {
  return (
    <div className={styles.carddetails2}>
      <div className={styles.containerdetails}>
        <div className={styles.coll}>
          <div className={styles.frameParent}>
            <div className={styles.vuesaxlinearwallet3Parent}>
              <img
                className={styles.vuesaxlinearwallet3Icon}
                alt=""
                src="/vuesaxlinearwallet3.svg"
              />
              <div className={styles.walletWrapper}>
                <div className={styles.wallet}>Wallet</div>
              </div>
            </div>
            <img
              className={styles.vuesaxlinearwallet3Icon}
              alt=""
              src="/vuesaxlineararrowright.svg"
            />
          </div>
        </div>
        <div className={styles.coll}>
          <div className={styles.frameParent}>
            <div className={styles.vuesaxlinearwallet3Parent}>
              <img
                className={styles.vuesaxlinearwallet3Icon}
                alt=""
                src="/vuesaxlinearbank.svg"
              />
              <div className={styles.walletWrapper}>
                <div className={styles.wallet}>Net Banking</div>
              </div>
            </div>
            <img
              className={styles.vuesaxlinearwallet3Icon}
              alt=""
              src="/vuesaxlineararrowright.svg"
            />
          </div>
        </div>
        <div className={styles.coll}>
          <div className={styles.frameParent}>
            <div className={styles.vuesaxlinearwallet3Parent}>
              <img
                className={styles.vuesaxlinearwallet3Icon}
                alt=""
                src="/vuesaxlinearmoneys.svg"
              />
              <div className={styles.walletWrapper}>
                <div className={styles.wallet}>Cash on Delivery</div>
              </div>
            </div>
            <img
              className={styles.vuesaxlinearwallet3Icon}
              alt=""
              src="/vuesaxlineararrowright.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CardDetail2;
