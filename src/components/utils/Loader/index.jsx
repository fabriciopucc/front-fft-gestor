import styles from './Loader.module.css';

export default function Loader(){

  return(
    <div className={styles.containerLoader}>
      <div className={styles.loading}></div>
    </div>
  )
}