import styles from './BotaoPaginacao.module.css';

export default function BotaoPaginacao({paginacao, avancar, voltar}){

  return(
    <div className={styles.botaoPaginacao}>
      <p
        className={styles.botao+" "+styles[(paginacao.page == 0) && "botaoDesativado"]}
        onClick={() => {
            if(paginacao.page !== 0){
              voltar();
            }
          }
        }
      >
        {"<"}
      </p>

      <p>{paginacao.page+1} / {paginacao.totalPages}</p>

      <p
        className={styles.botao+" "+styles[(paginacao.page == (paginacao.totalPages - 1)) && "botaoDesativado"]}
        onClick={() => {
            if(paginacao.page !== (paginacao.totalPages - 1)){
              avancar();
            }
          }
        }
      >
        {">"}
      </p>
    </div>
  );
}