import React from "react";
import styles from "./cadastro.module.sass";
import { useState } from "react";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function Cadastro() {
    const [show, setShow] = useState(false);
    return (

        <div className={styles.container}>
                <form className={styles.form}>
                <div className={styles.logo}>
                <img src="../images/logo-dark.png" width={50} className={styles.logo} />
                </div>
                <label>
                    <Icon className={styles.iconM}>person</Icon>
                    <input
                        required
                        placeholder="Nome"
                        type="text"
                        className={styles.input}
                    />
                </label>
                <label>
                    <Icon className={styles.iconM}>person</Icon>
                    <input
                        required
                        placeholder="Sobre nome"
                        type="text"
                        className={styles.input}
                    />
                </label>
                <label>

                    <input
                        required
                        placeholder="Email"
                        type="email"
                        className={styles.input}
                    />
                </label>
                <label>

                    <input
                        required
                        placeholder="Senha"
                        type="password"
                        className={styles.input}
                    />
                </label>
                <label>
                    <input
                        required
                        placeholder="Confirmar senha"
                        type="password"
                        className={styles.input}
                    />
                </label>
                <button className={styles.submit}>Confirmar</button>
                <div className={styles.signin}>
                    <p className={styles.text}>Já tem conta?</p>
                    <Link href="./" className={styles.registerLink}>Entrar</Link>
                </div>
                <div className={styles.socialBtn}>
                    <div className={styles.google}>
                        <button>
                            <img src="../images/content/google.svg" width={100} />
                        </button>
                    </div>
                    <div className={styles.apple}>
                        <button>
                            <img src="../images/content/apple-dark.svg" width={100} />
                        </button>
                    </div>
                </div>
                </form>
        </div>

    );
}

