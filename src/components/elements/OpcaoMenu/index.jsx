import styles from './OpcaoMenu.module.css';

import { Link } from 'react-router-dom';

import iconProximo from '@/assets/icons/iconProximo.png';
import useSessao from '@/hooks/useSessao';


export default function OpcaoMenu({evitarBloqueio, destino, srcIcon, altIcon, titulo, txtAlternativo}){

  const {sessao} = useSessao();
  let gestaoIniciou = sessao.saldoInicial > 0;

  return(
    <Link
      className={styles.opcao+" "+styles[(sessao.saldoInicial <= 0 && !evitarBloqueio) && "desativado"]}
      to={(evitarBloqueio) ? destino : (gestaoIniciou) && destino}
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