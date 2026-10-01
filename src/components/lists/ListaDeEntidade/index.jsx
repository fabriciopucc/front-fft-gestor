import styles from './ListaDeEntidade.module.css';

import { Loader } from "@/components/utils";
import useLoader from "@/hooks/useLoader";


export default function ListaDeEntidade({children, lista, textoAlternativo, classe}){

  const {carregando} = useLoader();

  return(
    <div
      className={styles.containerListaDeEntidade+" "+styles[classe]}
    >
      {
        carregando ? (
          <Loader/>
        )
        : lista.length ? (
          <>
            {children}
          </>
        ) : textoAlternativo ? (
          <p className={'aviso'}>{textoAlternativo}</p>
        ) : (<></>)
      }
    </div>
  );
}