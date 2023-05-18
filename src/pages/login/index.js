import React from "react";
import styles from "./login.module.sass";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import { useServer } from "@/server/server";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { loginUsingCredentials } = useServer();
  const handleLogin = () => {
    loginUsingCredentials(email, password);
  };
  console.log(email, password);
  return (
    <div className={"container"}>
      <form className={styles.form}>
        <img width={50} className={styles.logo} />
        <div className={styles.email}>
          <label>
            <div className={styles.iconM}>
              <EmailIcon />
            </div>
            <input
              required
              id="email"
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(text) => setEmail(text.target.value)}
              autoComplete={"@gmail.com"}
            />
          </label>
        </div>
        <div className={styles.senha}>
          <label>
            <div className={styles.iconP} onClick={() => setShow(!show)}>
              {show ? <LockOpenIcon /> : <LockIcon />}
            </div>
            <input
              required
              id="password"
              type={show ? "text" : "password"}
              className={styles.input}
              placeholder="Senha"
              autoComplete="password"
              value={password}
              // Note que "text" é um evento
              onChange={(text) => setPassword(text.target.value)}
            />
          </label>
        </div>
        <button onClick={handleLogin()} className={styles.submit}>
          Entrar
        </button>
        <div className={styles.separato}></div>{" "}
        <div className={styles.separator}></div>
        <div className={styles.h1}> Ou </div>
        <div className={styles.socialBtn}>
          <div className={styles.google}>
            <button></button>
          </div>
          <div className={styles.apple}>
            <button></button>
          </div>
        </div>
        <div className={styles.signin}>
          <p className={styles.text}>Não tem conta?</p>
          <Link href="./entrar/cadastro" className={styles.registerLink}>
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}
