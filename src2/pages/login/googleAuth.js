import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { loginUsingGoogle } from "../../service/auth";

const Google = () => {
  return (
    <div className={styles.btns}>
      <button
        style={{ marginTop: 3 }}
        onClick={() => loginUsingGoogle()}
        className={cn("button-stroke", styles.button)}
      >
        <img src="/images/content/google.svg" alt="Google" />
        Google
      </button>
    </div>
  );
};
export default Google;
