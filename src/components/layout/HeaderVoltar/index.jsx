import styles from './HeaderVoltar.module.css';

import { Link } from 'react-router-dom';
import iconVoltar from '@/assets/icons/iconVoltar.svg';

export default function HeaderVoltar({destino, tituloPagina}){

  return(
    <header className={styles.cabecalho}>
      <div className={styles.margemCabecalho}>
        <Link to={destino}>
          <img 
            src={iconVoltar}
            className={styles.iconVoltar}
            alt="Icon menu" 
          />
        </Link>

        <h1>{tituloPagina}</h1>

        <span></span>
      </div>
    </header>
  )
}