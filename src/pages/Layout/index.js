import React from "react";
import Header from "@/components/Header";
import styles from "./Layout.module.sass";

export default function Layout({ children }) {
  return (
    <>
    <Header></Header>

      <div className={styles.container}>{children}</div>
    </>
  );
}
