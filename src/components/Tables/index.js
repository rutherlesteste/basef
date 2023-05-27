import React from 'react';
import styles from './Tables.module.sass';

export default function Tables() {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <input type="radio" id="radio-1" name="tabs" defaultChecked="" />
        <label htmlFor="radio-1" className={styles.tab}>
          Hello
        </label>
        <input type="radio" id="radio-2" name="tabs" />
        <label htmlFor="radio-2" className={styles.tab}>
          UI
        </label>
        <input type="radio" id="radio-3" name="tabs" />
        <label htmlFor="radio-3" className={styles.tab}>
          World
        </label>
        <span className={styles.glider} />
      </div>
    </div>
  );
}
