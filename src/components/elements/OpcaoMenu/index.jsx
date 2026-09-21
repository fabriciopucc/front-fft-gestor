import styles from './OpcaoMenu.module.css';

import { Link } from 'react-router-dom';

import iconProximo from '@/assets/icons/iconProximo.png';


export default function OpcaoMenu({destino, srcIcon, altIcon, titulo, txtAlternativo}){

  return(
    <Link
      className={styles.opcao}
      to={destino}
    >
      <div className={styles.margemOpcao}>
        <div className={styles.molduraIcone}>
            <img 
            src={srcIcon} 
            alt={altIcon} 
          />
        </div>

        <div
          className={styles.titulo}
        >
          <p>{titulo}</p>
          <img 
            src={iconProximo} 
            alt="Icon próximo" 
          />
        </div>
        <p>{txtAlternativo}</p>
      </div>
    </Link>
  );
}