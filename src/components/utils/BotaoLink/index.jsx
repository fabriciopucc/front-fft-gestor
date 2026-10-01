import styles from './BotaoLink.module.css';

import { Link } from 'react-router-dom';


export default function BotaoLink({destino, texto, classeAdcional}){

  return(
    <Link
      to={destino}
      className={styles.botaoLink+" "+styles[classeAdcional]}
    >
      {texto}
    </Link>
  );
}