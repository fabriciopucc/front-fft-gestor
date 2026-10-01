import styles from './Resumo.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";

import Saldo from '@/components/elements/Saldo';
import useResumo from '@/hooks/useResumo';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import { Loader } from '@/components/utils';

import categoriasIcons from '@/constants/categoriasIcons';

export default function Resumo(){

  const {resumo} = useResumo();

  const listaGastosPorCategoriaNoSaldo = [...resumo?.gastosPorCategoriasNoSaldo ?? []]
    .sort((a, b) => Math.abs(b.valorGasto) - Math.abs(a.valorGasto))
    .filter((categoria) => categoria.valorGasto !== 0);
  
  const listaGastosPorCategoriaNoCartao = [...resumo?.gastosPorCategoriasNoCartao ?? []]
    .sort((a, b) => Math.abs(b.valorGasto) - Math.abs(a.valorGasto))
    .filter((categoria) => categoria.valorGasto !== 0);

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
              lista={listaGastosPorCategoriaNoSaldo}
            >
              <div className={styles.usoCategorias}>
                <div className={styles.margemUsoCategorias}>
                  <div className={styles.infosCategorias}>
                    <span>
                      <h1>Receitas/Gastos com saldo</h1>
                      <p>últimos 30 dias</p>
                    </span>
                  </div>
                  
                  {
                    listaGastosPorCategoriaNoSaldo.map((categoria, index) => (
                      <div
                        key={index}
                        className={styles.categoria}
                      >
                        <div className={styles.iconeCategoria}>
                         <img
                            src={(categoriasIcons[categoria.indiceIcon - 1] ?? categoriasIcons[0]).src}
                            alt="icon categoria"
                          />
                        </div>

                        <div className={styles.dadosCategoria}>
                          <p>
                            {categoria.nomeCategoria}
                          </p>
                          
                          <p className={styles[(categoria.valorGasto < 0) ? "negativo" : "positivo"]}>
                            {
                              (categoria.valorGasto < 0) ? "- " : "+ "
                            }
                            R$ 
                            {
                              Math.abs(categoria.valorGasto).toFixed(2) 
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
              lista={listaGastosPorCategoriaNoCartao}
              textoAlternativo={"Você ainda não possui nenhum gasto por categoria usando saldo"}
            >
              <div className={styles.usoCategorias}>
                <div className={styles.margemUsoCategorias}>
                  <div className={styles.infosCategorias}>
                    <span>
                      <h1>Gastos no cartão</h1>
                      <p>últimos 30 dias</p>
                    </span>
                  </div>
                  
                  {
                    listaGastosPorCategoriaNoCartao.map((categoria, index) => (
                      <div
                        key={index}
                        className={styles.categoria}
                      >
                        <div className={styles.iconeCategoria}>
                         <img
                            src={(categoriasIcons[categoria.indiceIcon - 1] ?? categoriasIcons[0]).src}
                            alt="icon categoria"
                          />
                        </div>

                        <div className={styles.dadosCategoria}>
                          <p>
                            {categoria.nomeCategoria}
                          </p>
                          
                          <p>
                            R$ 
                            {
                              Math.abs(categoria.valorGasto).toFixed(2) 
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