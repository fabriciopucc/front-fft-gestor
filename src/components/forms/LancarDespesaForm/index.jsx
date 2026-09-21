import useCartoes from '@/hooks/useCartoes';
import styles from './LancarDespesaForm.module.css';
import iconFechar from '@/assets/icons/close.png';

export default function LancarDespesaForm({setExibirFormularioLancarDespesa, despesa, setDespesa, preencherDespesa, lancarDespesaNoDiaAtual}){

  const {cartoes} = useCartoes();

  return(
    <div className={styles.containerFormLancarDespesa}>
      <div className={styles.botoesLancarDespesa}>
        <img 
          src={iconFechar}
          alt="Icone fechar"
          onClick={() => setExibirFormularioLancarDespesa(false)} 
        />
      </div>
  
      <div className={styles.formLancarDespesa}>
        <div className={styles.margemFormLancarDespesa}>
          <select 
            name='formaPagamento'
            onChange={(e) => preencherDespesa(e)}
            value={despesa.formaPagamento}
          >
            <option value="escolha">Escolha a forma de pagamento</option>
            <option value="saida">Saldo em conta</option>
            <option value="cartaoCredito">Cartão de crédito</option>
          </select>

          {
            despesa.formaPagamento == "cartaoCredito" && (
              <div className={styles.containerCartoes}>
                {
                  cartoes.map((cartao) => (
                    <div
                      key={cartao.codigo}
                      className={styles.cartao}
                    >
                      <span
                        onClick={() => setDespesa({...despesa, ['codigoCartao']: cartao.codigo})}
                        className={styles[(despesa.codigoCartao == cartao.codigo) && "cartaoSelecionado"]}
                      ></span>
                      <p>{cartao.apelido}</p>
                      <p>{cartao.ultimosDigitos}</p>
                      <p>R${(cartao.limiteUtilizado).toFixed(2)}/{(cartao.limiteTotal).toFixed(2)}</p>
                    </div>
                  ))
                }
              </div>
            )
          }

          <button
            disabled={(despesa.formaPagamento == "cartaoCredito" && !despesa.codigoCartao) || despesa.formaPagamento == "escolha"}
            className={((despesa.formaPagamento == "cartaoCredito" && !despesa.codigoCartao) || despesa.formaPagamento == "escolha") ? "desativado" : ""}
            onClick={lancarDespesaNoDiaAtual}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}