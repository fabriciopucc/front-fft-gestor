import styles from './ContainerMolde.module.css';


export default function ContainerMolde({children, classeAdicional}){

  return(
    <div className={styles.containerMolde+" "+styles[classeAdicional]}>
      {children}
    </div>
  );
}