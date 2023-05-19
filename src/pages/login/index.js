import Image from "../../components/Image";
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import axios from "axios";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import GoogleAuth from "./googleAuth";

import { useRouter } from "next/router";

import Link from "next/link";

export default function Login() {
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const heightWindow = use100vh();

  async function entrar() {
    try {
      const response = await axios.request(options);

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} href="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Core"
          />
        </Link>

        <div className={cn("h5", styles.title)}>Bem vindo a FreteMe!</div>

        <div className={styles.body}>
          <TextInput
            className={styles.field}
            name="email"
            type="email"
            placeholder="Your email"
            required
            icon="mail"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            className={styles.field}
            name="password"
            type="password"
            placeholder="Password"
            required
            icon="lock"
            value={senha}
            setValue={setSenha}
          />
          <button onClick={entrar} className={cn("button", styles.button)}>
            Entrar
          </button>
          <div className={styles.subtitle}>Ou entre com suas redes sociais</div>
          <GoogleAuth />
          <div className={styles.info}>
            Não tem uma conta?{"  "}
            <Link className={styles.link} href="/cadastro">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
