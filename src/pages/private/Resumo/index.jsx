import styles from './Resumo.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";

import Saldo from '@/components/elements/Saldo';
import useResumo from '@/hooks/useResumo';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import { Loader } from '@/components/utils';

import categoriasIcons from '@/constants/categoriasIcons';
import { useState } from 'react';
import BarraProgresso from '@/components/utils/BarraProgresso';

export default function Resumo(){

  const {resumo} = useResumo();

  const [filtroQuantidadeDiasGastosComSaldo, setFiltroQuantidadeDiasGastosComSaldo] = useState("semana");
    const [filtroQuantidadeDiasGastosComCartao, setFiltroQuantidadeDiasGastosComCartao] = useState("semana");

  const listaGastosPorCategoriaNoSaldo = [
    ...((filtroQuantidadeDiasGastosComSaldo == "semana")
      ? resumo?.gastosPorCategoriasNoSaldoNosUltimosSeteDias ?? []
      : resumo?.gastosPorCategoriasNoSaldoNosUltimosTrintaDias ?? [])
  ]
  .sort((a, b) => Math.abs(b.valorGasto) - Math.abs(a.valorGasto))
  .filter((categoria) => categoria.valorGasto !== 0);


  const receitasComSaldo = listaGastosPorCategoriaNoSaldo
  .reduce((soma, categoria) =>
    soma + (categoria.valorGasto > 0 ? categoria.valorGasto : 0)
  , 0);

  const gastosComSaldo = listaGastosPorCategoriaNoSaldo
  .reduce((soma, categoria) =>
    soma + (categoria.valorGasto < 0 ? categoria.valorGasto : 0)
  , 0);

  let balancoComSaldo = receitasComSaldo + gastosComSaldo;

  
  const listaGastosPorCategoriaNoCartao = [
    ...((filtroQuantidadeDiasGastosComCartao == "semana")
      ? resumo?.gastosPorCategoriasNoCartaoNosUltimosSeteDias ?? []
      : resumo?.gastosPorCategoriasNoCartaoNosUltimosTrintaDias ?? [])
  ]
  .sort((a, b) => Math.abs(b.valorGasto) - Math.abs(a.valorGasto))
  .filter((categoria) => categoria.valorGasto !== 0);

  const totalGastosComCartao = listaGastosPorCategoriaNoCartao
  .reduce((soma, categoria) => soma + categoria.valorGasto, 0);

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
              textoAlternativo={"Você ainda não possui nenhum gasto por categoria usando saldo"}
            >
              <div className={styles.seletorQuantidadeDias}>
                <div 
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroQuantidadeDiasGastosComSaldo == "semana") && "quantidadeDiasSelecionado"]}
                  onClick={() => setFiltroQuantidadeDiasGastosComSaldo("semana")}
                >
                  7 dias
                </div>

                <div 
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroQuantidadeDiasGastosComSaldo == "mes") && "quantidadeDiasSelecionado"]}
                  onClick={() => setFiltroQuantidadeDiasGastosComSaldo("mes")}
                >
                  30 dias
                </div>
              </div>

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
                          
                          <p className={(categoria.valorGasto > 0) ? "valorPositivo" : "valorNegativo"}>
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

                  <div className={styles.metricasSaldo}>
                    <div className={styles.valoresMetricasSaldo}>
                      <p className={styles.receita+" "+['valorPositivo']}>
                        + R$ {receitasComSaldo.toFixed(2)}
                      </p>

                      <p className={styles.rodapeValoresMetricas}>Receitas</p>
                    </div>
                   
                    <div className={styles.valoresMetricasSaldo}>
                      <p className={styles.gasto+" "+['valorNegativo']}>
                        - R$ {Math.abs(gastosComSaldo).toFixed(2)}
                      </p>

                      <p className={styles.rodapeValoresMetricas}>Gastos</p>
                    </div>

                    <div className={styles.valoresMetricasSaldo}>
                      <p className={styles.balanco+" "+[(balancoComSaldo > 0) ? "valorPositivo" : "valorNegativo"]}>
                        {balancoComSaldo > 0 ? "+ " : "- "}
                        R$ {Math.abs(balancoComSaldo).toFixed(2)}
                      </p>

                      <p className={styles.rodapeValoresMetricas}>Balanço</p>
                    </div>
                  </div>
                </div>
              </div>
            </ListaDeEntidade>

            <ListaDeEntidade
              lista={listaGastosPorCategoriaNoCartao}
              textoAlternativo={"Você ainda não possui nenhum gasto por categoria usando cartão"}
            >
              <div className={styles.seletorQuantidadeDias}>
                <div 
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroQuantidadeDiasGastosComCartao == "semana") && "quantidadeDiasSelecionado"]}
                  onClick={() => setFiltroQuantidadeDiasGastosComCartao("semana")}
                >
                  7 dias
                </div>

                <div 
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroQuantidadeDiasGastosComCartao == "mes") && "quantidadeDiasSelecionado"]}
                  onClick={() => setFiltroQuantidadeDiasGastosComCartao("mes")}
                >
                  30 dias
                </div>
              </div>

              <div className={styles.usoCategorias}>
                <div className={styles.margemUsoCategorias}>
                  <div className={styles.infosCategorias}>
                    <span>
                      <h1>Gastos com cartão</h1>
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

                  <div className={styles.metricasCartao}>
                    <h1>R$ {totalGastosComCartao.toFixed(2)}</h1>
                    <p>Total</p>
                  </div>
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
                          

                          <BarraProgresso
                            inicial={cartao.limiteUtilizado}
                            maximo={cartao.limiteTotal}
                          />
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