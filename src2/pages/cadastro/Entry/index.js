import React, { useRef, useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import TextInput from "../../../components/TextInput";
import axios from "axios";
import cn from "classnames";
import styles from "./Entry.module.sass";
import GoogleAuth from "../../login/googleAuth";

import { Id, account } from "../../../service/serve";
import { useRouter } from "next/router";

const Entry = ({ onConfirm, signInWithGoogle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const history = useRouter();
  const [load, setLoad] = useState(false);
  const captchaRef = useRef(null);
  const [cadastroError, setCadastroError] = useState("");
  const [captcha, setCaptcha] = useState(true);

  const sendVerificationEmail = async (nome, email, codigo) => {
    const API_EMAIL_URL = `https://freteme.com/email?email=${email}&nome=${nome}&codigo=${codigo}`;
    const options = {
      method: "GET",
      url: API_EMAIL_URL,
    };

    try {
      const response = await axios.request(options);
      if (response.status === 200 || response.data.status === 200) {
        localStorage.setItem("codigo", codigo);
        onConfirm();
      }
    } catch (error) {
      console.error(error);
      setCadastroError("Não foi possível enviar o email de verificação");
      return false;
    }
  };

  const handleSignup = async () => {
    try {
      const user = await account.create(
        Id.unique(),
        email,
        password,
        name,
        `+55${phone}`
      );
      const session = await account.createEmailSession(email, password);

      localStorage.setItem("user_id", user?.$id);
      localStorage.setItem("userName", user?.name);
      localStorage.setItem("email", user?.email);
      localStorage.setItem("session", session);
      localStorage.setItem("user", JSON.stringify(user));
      setLoad(false);

      await sendVerificationEmail(
        user?.name,
        user?.email,
        Id.unique().substring(0, 4)
      );
    } catch (e) {
      setCadastroError(`${e.message}`);
      setLoad(false);
    }
  };

  return (
    <div className={styles.entry}>
      <div className={styles.head}>
        <div className={cn("h4", styles.title)}>Seja bem vindo!</div>
        <div className={styles.label}>Precisamos te conhecer melhor </div>
      </div>
      <div className={styles.body}>
        <TextInput
          label={"name"}
          className={styles.field}
          name="name"
          type="text"
          placeholder="Seu name"
          required
          icon="profile-circle"
          value={name}
          setValue={setName}
        />
        <TextInput
          label={"Email"}
          className={styles.field}
          name="email"
          type="email"
          placeholder="Seu email"
          required
          icon="mail"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label={"phone"}
          className={styles.field}
          name="phone"
          placeholder="Seu phone"
          required
          icon="phone"
          value={phone}
          setValue={setPhone}
        />
        <TextInput
          label={"password"}
          className={styles.field}
          name="password"
          type="password"
          placeholder="Sua password"
          required
          icon="lock"
          value={password}
          setValue={setPassword}
        />

        <ReCAPTCHA
          className={styles.cap}
          sitekey="6LcmmN8kAAAAACxcQMZFI2wclrEqdGIcakn3RfCS"
          onChange={setCaptcha}
          ref={captchaRef}
        />

        {captcha ? (
          <button
            disabled={load}
            className={cn("button", styles.button)}
            onClick={() => handleSignup()}
          >
            Continue
          </button>
        ) : (
          <button
            disabled={load}
            className={cn("button", styles.button)}
            onClick={() => handleSignup()}
          >
            Continue
          </button>
        )}

        <div className={styles.error}>{cadastroError}</div>

        <div className={styles.subtitle}>Ou entre com suas redes sociais</div>

        <GoogleAuth />
      </div>
    </div>
  );
};

export default Entry;
