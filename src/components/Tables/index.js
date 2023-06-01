import React from 'react';
import styles from './Tables.module.sass';




export default function Tables({handleService,service}) {

  const handleStep = (step) =>{
    console.log(step)
    handleService(
      {
        ...service,
        step:step

      }
    )
  }
  return (
    <div className={styles.container}>
    <div className={styles.tabs}>
      <input onChange={(e)=> handleStep(e.target.id)} type="radio" id="1" name="tabs" defaultChecked="" />
      <label className={styles.tab} htmlFor="1">
        Local<span className={styles.notification}>2</span>
      </label>
      <input onChange={(e)=> handleStep(e.target.id)} type="radio" id="2" name="tabs" />
      <label className={styles.tab} htmlFor="2">
        Serviço
      </label>
      <input onChange={(e)=> handleStep(e.target.id)} type="radio" id="3" name="tabs" />
      <label className={styles.tab} htmlFor="3">
        Detalhes
      </label>
      <span className={styles.glider} />
    </div>
  </div>
  
  );
}
