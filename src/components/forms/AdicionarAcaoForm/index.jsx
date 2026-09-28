import useCartoes from '@/hooks/useCartoes';
import styles from './AdicionarAcaoForm.module.css'
import useCategorias from '@/hooks/useCategorias';
import useLoader from '@/hooks/useLoader';
import useAcao from '@/hooks/useAcao';
import Input from '@/components/itensForm/Input';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';


export default function AdicionarAcaoForm(){

  const {acao, definirFormaDePagamento, definirCategoriaAcao, definirCartao, definirTipoTransacao, preencherAcao, enviarFormularioAdicionarAcao} = useAcao();
  const {visibilidadeLoader} = useLoader();
  const {categorias} = useCategorias();
  const {cartoes} = useCartoes();


  return(
    <form onSubmit={enviarFormularioAdicionarAcao}>
      <Input
        dica={"Digite o valor"}
        nome={"valor"}
        entidade={acao.valor}
        preencherEntidade={preencherAcao}
        eNumerico={true}
      />

      <select 
        onChange={(e) => definirFormaDePagamento(e)}
        value={acao.formaPagamento || "escolha"}
      >
        <option value="escolha">Escolha a forma de pagamento</option>
        <option value="saldoEmConta">Saldo em conta</option>
        <option value="cartaoCredito">Cartão de crédito</option>
      </select>

      {
        acao.formaPagamento == "cartaoCredito" ? (
          <>
            {
              cartoes.length ? (
                <div
                  className={styles.containerCartoes}
                >
                  <div
                    className={styles.cartao}
                  >
                    <div 
                      className={styles.selecionarCartao}
                    ></div>

                    <div
                      className={styles.informacoesCartao}
                    >
                      <p>Apelido</p>
                      <p>Digitos</p>
                      <p>Limite</p>
                    </div>
                  </div>
                  {
                    cartoes.map((cartao) => (
                      <div
                        key={cartao.codigo}
                        className={styles.cartao}
                      >
                        <div
                          className={styles.selecionarCartao}
                          onClick={() => definirCartao(cartao.codigo+'-'+cartao.apelido)}
                        >
                          <div className={styles[(acao.codigoCartao == cartao.codigo) && 'selecionado']}></div>
                        </div>

                        <div
                          className={styles.informacoesCartao}
                        >
                          <p>{cartao.apelido}</p>
                          <p>{cartao.ultimosDigitos}</p>
                          <p>R$ {cartao.limiteUtilizado.toFixed(2)}/{cartao.limiteTotal}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <>
                  <p className={'aviso'}>Você ainda não possui cartões cadastrados!</p>
                  <br />
                </>
              )
            }
          </>
        ) : acao.formaPagamento == "saldoEmConta" && (
          <>
            <div className={styles.linhaTipoTransacao}>
              <div 
                className={styles[(acao.tipoTransacao == "saida") && 'selecionado']}
                id='saida'
                onClick={(e) => definirTipoTransacao(e)}  
              ></div>

              <p
                id='saida'
                onClick={(e) => definirTipoTransacao(e)}    
              >
                Saída
              </p>
            </div>

            <div className={styles.linhaTipoTransacao}>
              <div 
                className={styles[(acao.tipoTransacao == "entrada") && 'selecionado']}
                id='entrada'
                onClick={(e) => definirTipoTransacao(e)}    
              ></div>

              <p
                id='entrada'
                onClick={(e) => definirTipoTransacao(e)}
              >
                Entrada
              </p>
            </div>
          </>
        )
      }

      <ListaDeEntidade
        classe={"semMargemSuperior"}
        lista={categorias}
        textoAlternativo={"Ainda não há categorias cadastradas!Z\n Cadastre ao menos uma, na sessão Categorias"}
      >
        <select 
          onChange={(e) => definirCategoriaAcao(e)}
          value={acao.categoria || "escolha"}
        >
          <option value="escolha">Escolha a categoria de gasto</option>
          {
            categorias.map((categoria) => (
              <option
                key={categoria.codigo}
                id={categoria.indiceIcon}
                value={categoria.nome}
              >
                {categoria.nome}
              </option>
            ))
          }
        </select>
      </ListaDeEntidade>

      <br />

      <button
        disabled={
          (acao.formaPagamento == "saldoEmConta") ? 
              !(acao.valor > 0 && acao.tipoTransacao && acao.categoria != "escolha")
          : (acao.formaPagamento == "cartaoCredito") ? 
              !(acao.valor > 0 && acao.tipoTransacao && acao.codigoCartao && acao.apelidoCartao && acao.categoria != "escolha")
          : (acao.formaPagamento == "escolha")
        }
        className={
          (acao.formaPagamento == "saldoEmConta") ? 
              (acao.valor > 0 && acao.tipoTransacao && acao.categoria != "escolha") ? "" : "desativado"
          : (acao.formaPagamento == "cartaoCredito") ? 
              (acao.valor > 0 && acao.tipoTransacao && acao.codigoCartao && acao.apelidoCartao && acao.categoria != "escolha") ? "" : "desativado"
          : (acao.formaPagamento == "escolha") && "desativado"
        }
      >
        Adicionar
      </button>
    </form>
  );
}