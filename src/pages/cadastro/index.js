import React, { useEffect, useState } from "react";

import Code from "./Code";
import Entry from "./Entry";
import Image from "../../components/Image";
import Link from "next/link";
import cn from "classnames";
import styles from "./SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { account, getAccount, loginUsingCredentials } from "../../service/auth";
import { Client, Account } from "appwrite";
import { useRouter } from "next/router";

const items = [
  "Movendo seus negócios para o próximo nível",
  "logística fácil e eficiente",
  "Transformando a logística para o mundo digital:",
  "acompanhe tudo em tempo real ",
];

const getFirstAndLastCharacters = (string) => {
  const firstCharacters = string.substring(0, 4);
  const lastCharacters = string.substring(string.length - 4);
  return firstCharacters + lastCharacters;
};

const SignUp = ({}) => {
  const [cadastroError, setCadastroError] = useState("");
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const heightWindow = use100vh();
  const [visible, setVisible] = useState(true);

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/content/login-pic.png" alt="Login" />
          </div>
          <div className={cn("h4", styles.subtitle)}>Freteme</div>
          <ul className={styles.list}>
            {items.map((x, index) => (
              <li key={index}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.col} style={{ minHeight: heightWindow }}>
        <div className={styles.head}>
          <Link className={styles.logo} href="/">
            <Image
              className={styles.pic}
              src="/images/logo-dark.png"
              srcDark="/images/logo-light.png"
              alt="Core"
            />
          </Link>
          <div className={styles.error}>{cadastroError}</div>
          <div className={styles.info}>
            Ja possui conta?{" "}
            <Link className={styles.link} href="/login">
              Entrar
            </Link>
          </div>
        </div>
        <div className={styles.wrapper}>
          {visible ? <Entry onConfirm={setVisible} /> : <Code />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
