import styles from './AletararLimiteForm.module.css';

import InputNumerico from "@/components/itensForm/InputNumerico";

export default function AlterarLimiteForm({cartao, setVisibilidadeAlterarLimite, preencherCartao}){


  return(
    <form 
      className={styles.formAlterarLimite}
    >
      <InputNumerico
        dica={"Digite o novo limite"}
        nome={"limite"}
        entidade={cartao.limite}
        preencherEntidade={preencherCartao}
      />

      <div
        className={styles.botoesAlterarLimite}
      >
        <button
          className={[cartao.cor]}
          type='button'
          onClick={() => setVisibilidadeAlterarLimite(false)}
        >
          Cancelar
        </button>

        <button
          className={['botaoPositivo']}
        >
          Confirmar
        </button>
      </div>  
    </form>
  );
}