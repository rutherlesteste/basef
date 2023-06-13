import cn from "classnames";
import styles from "./Code.module.sass";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

const Code = () => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const history = useRouter();
  const [codError, setCodError] = useState("");

  function handleInput(event) {
    const input = event.target;
    const maxLength = input.maxLength;
    const currentLength = input.value.length;

    if (currentLength >= maxLength) {
      switch (input.name) {
        case "number1":
          input2Ref.current.focus();
          break;
        case "number2":
          input3Ref.current.focus();
          break;
        case "number3":
          input4Ref.current.focus();
          break;
        case "number4":
          // O último campo atingiu o comprimento máximo, você pode fazer algo aqui, como enviar o formulário
          break;
        default:
          break;
      }
    }
  }

  const verifCode = () => {
    const userCode = localStorage.getItem("codigo");
    const code =
      input1Ref.current.value +
      input2Ref.current.value +
      input3Ref.current.value +
      input4Ref.current.value;

    if (code == userCode) {
      return history.push("/");
    } else {
      setCodError("codigo incorreto");
    }
  };

  return (
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}>
          Acabamos de enviar um código de verificação. Verifique sua caixa de
          entrada .
        </div>
        <form className={styles.fieldset}>
          <div className={styles.field}>
            <input
              onFocus={() => setCodError("")}
              className={styles.input}
              name="number1"
              type="tel"
              autoComplete="off"
              required
              maxLength={1}
              ref={input1Ref}
              onInput={handleInput}
            />
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number2"
              type="tel"
              autoComplete="off"
              required
              maxLength={1}
              ref={input2Ref}
              onInput={handleInput}
            />
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number3"
              type="tel"
              autoComplete="off"
              required
              maxLength={1}
              ref={input3Ref}
              onInput={handleInput}
            />
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number4"
              type="tel"
              autoComplete="off"
              required
              maxLength={1}
              ref={input4Ref}
              onInput={handleInput}
            />
          </div>
        </form>
        <div className={styles.errorNote}>codigo incorreto</div>
        <button
          onClick={() => verifCode()}
          className={cn("button", styles.button)}
        >
          <span>Continue</span>
        </button>
        <div className={styles.note}>
          <Text fontSize={20} color={"red.400"}>
            {codError}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Code;
