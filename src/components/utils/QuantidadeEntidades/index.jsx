import styles from './QuantidadeEntidades.module.css';

export default function QuantidadeEntidades({lista, limite, nomeEntidade, visibilidadeForm, exibirForm}){

  return(
    <div className={styles.quantidadeEntidades}>
      <p>
        {lista.length}
        /{limite}  
        &nbsp; {nomeEntidade}
      </p>

      {
        !visibilidadeForm && (
          <button 
            onClick={exibirForm}
          >
            +
          </button>
        )
      }
    </div>
  );
}