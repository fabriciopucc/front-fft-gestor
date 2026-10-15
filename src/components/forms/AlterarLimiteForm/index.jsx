import styles from './AletararLimiteForm.module.css';


export default function AlterarLimiteForm({cartao, setVisibilidadeAlterarLimite, novoLimite, definirNovoLimite, enviarFormularioAlterarLimiteCartao}){

  return(
    <form 
      className={styles.formAlterarLimite}
      onSubmit={(e) => enviarFormularioAlterarLimiteCartao(e, cartao.codigo)}
    >
      <input 
        type="number" 
        placeholder={"Digite o novo limite"}
        onChange={(e) => definirNovoLimite(e)}
        value={novoLimite || ""}
      />

      <div
        className={styles.botoesAlterarLimite}
      >
        <button
          className={'btn'+[cartao.cor]}
          type='button'
          onClick={() => setVisibilidadeAlterarLimite(false)}
        >
          Cancelar
        </button>

        <button
          disabled={novoLimite <= 0}
          className={['botaoPositivo']+" "+[(novoLimite <= 0) && "desativado"]}
        >
          Confirmar
        </button>
      </div>  
    </form>
  );
}