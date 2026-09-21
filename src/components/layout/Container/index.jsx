import styles from './Container.module.css';

export default function Container({children, centralizar}){


  return(
    <div className={styles.container}>
      <div className={styles.margemContainer+" " +styles[(centralizar) && "centralizar"]}>
        {children}
      </div>
    </div>
  )
}