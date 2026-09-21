import styles from './Header.module.css';

import iconMenu from '@/assets/icons/iconMenu.png';
import { useLocation } from 'react-router-dom';


export default function Header(){

  const location = useLocation();

  return(
    <header className={styles.cabecalho}>
      <div className={styles.margemCabecalho}>
        <label htmlFor="menuBar">
          <img 
            src={iconMenu}
            className={styles.iconMenu} 
            alt="Icon menu" 
          />
        </label>
      </div>
    </header>
  )
}