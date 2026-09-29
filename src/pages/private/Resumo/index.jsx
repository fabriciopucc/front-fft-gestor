import styles from './Resumo.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";
import useSaldo from '@/hooks/useSaldo';
import Saldo from '@/components/elements/Saldo';
import useResumo from '@/hooks/useresumo';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import { Loader } from '@/components/utils';

export default function Resumo(){

  const {resumo, filtroTipoDeUsoCategoria, setFiltroTipoDeUsoCategoria} = useResumo();

  const listaCategorias = resumo?.gastosPorCategorias ?? [];
  const listaCartoes = resumo?.cartoesSimplificados ?? [];

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
      />

      {
        resumo ? (
          <>
            <Saldo/>

            <ListaDeEntidade
              lista={listaCategorias}
              textoAlternativo={"Erro"}
            >
              <div className={styles.usoCategorias}>
                <div className={styles.margemUsoCategorias}>
                  <div className={styles.infosCategorias}>
                    <h1>Categorias</h1>

                    <select
                      onChange={(e) => setFiltroTipoDeUsoCategoria(e.target.value)}
                    >
                      <option value="saldo">Saldo</option>
                      <option value="cartao">Cartão</option>
                    </select>
                  </div>
                  
                  {
                    listaCategorias.map((categoria, index) => (
                      <div
                        key={index}
                        className={styles.categoria}
                      >
                        <div className={styles.iconeCategoria}>
                          <p>{categoria.nomeCategoria.charAt(0)}</p>
                        </div>

                        <div className={styles.dadosCategoria}>
                          <p>
                            {categoria.nomeCategoria}
                          </p>
                          
                          <p className={styles[
                            (filtroTipoDeUsoCategoria == "saldo") ? 
                              (categoria.valorGastoComSaldo < 0) ? "negativo" : "positivo"
                            : (filtroTipoDeUsoCategoria == "cartao") &&
                              (categoria.valorGastoComCartao < 0) ? "negativo" : "positivo"
                          ]}>
                            R$ 
                            {
                              filtroTipoDeUsoCategoria == "saldo" ? categoria.valorGastoComSaldo.toFixed(2) 
                              :  categoria.valorGastoComCartao.toFixed(2)
                            }
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </ListaDeEntidade>

            <ListaDeEntidade
              lista={listaCartoes}
              textoAlternativo={"Erro"}
            >
              <div className={styles.cartoes}>
                <div className={styles.margemCartoes}>
                  <div className={styles.infosCartoes}>
                    <h1>Cartões</h1>
                  </div>
                  
                  {
                    listaCartoes.map((cartao, index) => (
                      <div
                        key={index}
                        className={styles.categoria}
                      >
                        <div className={styles.iconeCategoria}>
                          <p>{cartao.apelido.charAt(0)}</p>
                        </div>

                        <div className={styles.dadosCartao}>
                          <p>
                            {cartao.apelido}
                          </p>

                          <p>{((cartao.limiteUtilizado/cartao.limiteTotal)*100).toFixed(0)}%</p>

                          <p>
                            R$ {cartao.limiteUtilizado.toFixed(2)} de 
                            R$ {cartao.limiteTotal.toFixed(2)}
                          </p>
                          

                          <div className={styles.barraProgresso}>
                            <div
                              className={styles.barraPreenchida}
                              style={{ width: `${(cartao.limiteUtilizado/cartao.limiteTotal)*100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </ListaDeEntidade>
          </>
        ) : (
          <Loader/>
        )
      }

    </Container>
  )
}