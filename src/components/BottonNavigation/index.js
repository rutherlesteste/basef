import { Notifications, NotificationsOutlined, Person2Outlined, Search } from '@mui/icons-material';
import React from 'react';
import styles from './BottonNavigation.module.sass';




export default function Tables({ handleService , app , handleApp }) {

  const handleStep = (step) => {

    handleApp(
      {
        
        step: step

      }
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
    
        <input onChange={(e) => handleStep(e.target.id)} defaultChecked="1" type="radio" id="1" name="tabs" />
        <label className={styles.tab} htmlFor="1">
          <Search />
        </label>
        
        <input onChange={(e) => handleStep(e.target.id)} type="radio" id="2" name="tabs"  />
        <label className={styles.tab} htmlFor="2">
          <NotificationsOutlined/> <span className={styles.notification}>2</span>
        </label>
        <input onChange={(e) => handleStep(e.target.id)} type="radio" id="3" name="tabs" />
        <label className={styles.tab} htmlFor="3">
          <Person2Outlined/>
        </label>
        <span className={styles.glider} />
      </div>
    </div>

  );
}
