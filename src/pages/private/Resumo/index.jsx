import styles from './Resumo.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";

import Saldo from '@/components/elements/Saldo';
import useResumo from '@/hooks/useResumo';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import { Loader } from '@/components/utils';

import icon from '@/assets/icons/categorias/iconEngrenagem.png';
import categoriasIcons from '@/constants/categoriasIcons';

export default function Resumo(){

  const {resumo, filtroTipoDeUsoCategoria, setFiltroTipoDeUsoCategoria} = useResumo();

  //Filtrando apenas gastos diferentes de 0 de acordo com o filtro e em ordem decrescente de valor (usando valor absoluto).
  const listaCategorias = [...resumo?.gastosPorCategorias ?? []]
  .sort(
    (filtroTipoDeUsoCategoria == "saldo") ?
      (a, b) => Math.abs(b.valorGastoComSaldo) - Math.abs(a.valorGastoComSaldo)
    : 
      (a, b) => Math.abs(b.valorGastoComCartao) - Math.abs(a.valorGastoComCartao)
  )
  .filter((categoria) => 
    (filtroTipoDeUsoCategoria == "saldo") ? 
      categoria.valorGastoComSaldo !== 0
    :
      categoria.valorGastoComCartao !== 0
  );

  const listaCartoes = resumo?.cartoesSimplificados ?? [];

  console.log(listaCategorias)

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
              textoAlternativo={"Você ainda não possui nenhum gasto por categoria"}
            >
              <div className={styles.usoCategorias}>
                <div className={styles.margemUsoCategorias}>
                  <div className={styles.infosCategorias}>
                    <span>
                      <h1>Gastos</h1>
                      <p>últimos 30 dias</p>
                    </span>

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
                          <img src={categoriasIcons[categoria.indiceIcon - 1].src} alt="icon categoria"/>
                        </div>

                        <div className={styles.dadosCategoria}>
                          <p>
                            {categoria.nomeCategoria}
                          </p>
                          
                          <p className={styles[
                            (filtroTipoDeUsoCategoria == "saldo") ? 
                              (categoria.valorGastoComSaldo < 0) ? "negativo" : "positivo"
                            :
                              (categoria.valorGastoComCartao < 0) ? "negativo" : "positivo"
                          ]}>
                            {
                              (filtroTipoDeUsoCategoria == "saldo") ? 
                                (categoria.valorGastoComSaldo < 0) ? "- " : "+ "
                              : 
                                (categoria.valorGastoComCartao < 0) ? "- " : "+ "
                            }
                            R$ 
                            {
                              (filtroTipoDeUsoCategoria == "saldo") ? 
                                Math.abs(categoria.valorGastoComSaldo).toFixed(2) 
                              :  
                                Math.abs(categoria.valorGastoComCartao).toFixed(2)
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
              textoAlternativo={"Você ainda não possui cartões cadastrados"}
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