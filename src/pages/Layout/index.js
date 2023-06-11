import React from "react";
import Header from "@/components/Header";
import styles from './Layout.module.sass'
import BottonNavigation from '../../components/BottonNavigation'
import { useSelector, useDispatch } from "react-redux";
import { setApp } from "@/context/appSlice";

export default function Layout({ children }) {

 const dispatch = useDispatch()
 const app = useSelector((state) => state.app.app);
 const {step ,isOpen} = app


 const handleApp = (dados) => {
  dispatch(setApp({ ...app, ...dados }));
};


  return (
    <>

    <div className={styles.container} >


 {children}

 {!isOpen && (<BottonNavigation handleApp={handleApp} step={step} app={app}  />)}
    </div>
    </>
  );
}
