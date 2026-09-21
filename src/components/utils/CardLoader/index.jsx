import styles from './CardLoader.module.css';

import useLoader from '@/hooks/useLoader';


export default function CardLoader(){

  const {visibilidadeCardLoader} = useLoader();

  return(
    <>
      {
        visibilidadeCardLoader && (
          <div className={styles.containerCardLoader}>
            <div className={styles.cardLoader}>
              <div className={styles.loading}></div>
            </div>
          </div>
        )
      }
    </>
  )
}