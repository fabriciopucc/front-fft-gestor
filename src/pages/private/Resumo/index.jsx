import styles from './Resumo.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";

import Saldo from '@/components/elements/Saldo';
import useResumo from '@/hooks/useResumo';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import { Loader } from '@/components/utils';

import categoriasIcons from '@/constants/categoriasIcons';
import iconSetaParaBaixo from '@/assets/icons/iconSetaParaBaixo.svg'
import BarraProgresso from '@/components/utils/BarraProgresso';
import converterDataAmericanaEmBrasileira from '@/utils/converterDataAmericanaEmBrasileira';

export default function Resumo(){

  const {
    alterarFiltroPeriodo, filtroPeriodo,
    resumo,
    acoesPorCategoria, exibirAcoes,
    buscarAcoesPorCategoriaDeUmUsuario
  } = useResumo();

  const listaGastosPorCategoriaNoSaldo = [
    ...((filtroPeriodo.comSaldo == "semana")
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
    ...((filtroPeriodo.comCartao == "semana")
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
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroPeriodo.comSaldo == "semana") && "quantidadeDiasSelecionado"]}
                  onClick={() => alterarFiltroPeriodo("comSaldo", "semana")}
                >
                  7 dias
                </div>

                <div 
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroPeriodo.comSaldo == "mes") && "quantidadeDiasSelecionado"]}
                  onClick={() => alterarFiltroPeriodo("comSaldo", "mes")}
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
                      >
                        <div
                          className={styles.categoria}
                          onClick={() => buscarAcoesPorCategoriaDeUmUsuario(categoria.nomeCategoria, index, "comSaldo")}
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

                          <img 
                            src={iconSetaParaBaixo} 
                            className={styles.iconSeta+" "+styles[(exibirAcoes == index) && "iconInvertido"]}
                            alt="Icon seta para baixo" 
                          />
                        </div>

                        {
                          (exibirAcoes.indice == index && exibirAcoes.tipo == "comSaldo") && (
                            <ListaDeEntidade
                              lista={acoesPorCategoria}
                            >
                              <div className={styles.acoes}>
                                {
                                  acoesPorCategoria
                                  .filter((acao) => ['entrada', 'saida'].includes(acao.tipoTransacao))
                                  .map((acao) => (
                                    <div
                                      key={acao.codigo} 
                                      className={styles.acaoCategoria}
                                    >
                                      <div className={styles.infoAcaoCategoria}>
                                        <p className={styles.dataAcaoCategoria}>
                                          {converterDataAmericanaEmBrasileira(acao.data)}
                                        </p>
                                        
                                        <p className={styles.horarioAcaoCategoria}>
                                          {acao.horario}
                                        </p>
                                      </div>

                                      <div className={styles.infoAcaoCategoria}>
                                        <p className={styles.valorAcaoCategoria}>
                                          {(acao.tipoTransacao == "entrada") ? "+ " : "- "}
                                          R$ {acao.valor.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </ListaDeEntidade>
                          )
                        }
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
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroPeriodo.comCartao == "semana") && "quantidadeDiasSelecionado"]}
                  onClick={() => alterarFiltroPeriodo("comCartao", "semana")}
                >
                  7 dias
                </div>

                <div 
                  className={styles.opcaoQuantidadeDias+" "+styles[(filtroPeriodo.comCartao == "mes") && "quantidadeDiasSelecionado"]}
                 onClick={() => alterarFiltroPeriodo("comCartao", "mes")}
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
                      >
                        <div
                          className={styles.categoria}
                          onClick={() => buscarAcoesPorCategoriaDeUmUsuario(categoria.nomeCategoria, index, "comCartao")}
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

                          <img 
                            src={iconSetaParaBaixo} 
                            className={styles.iconSeta+" "+styles[(exibirAcoes == index) && "iconInvertido"]}
                            alt="Icon seta para baixo" 
                          />
                        </div>

                        {
                         (exibirAcoes.indice == index && exibirAcoes.tipo == "comCartao") && (
                            <ListaDeEntidade
                              lista={acoesPorCategoria}
                            >
                              <div className={styles.acoes}>
                                {
                                  acoesPorCategoria
                                  .filter((acao) => acao.tipoTransacao == "cartaoCredito")
                                  .map((acao) => (
                                    <div
                                      key={acao.codigo} 
                                      className={styles.acaoCategoria}
                                    >
                                      <div className={styles.infoAcaoCategoria}>
                                        <p className={styles.dataAcaoCategoria}>
                                          {converterDataAmericanaEmBrasileira(acao.data)}
                                        </p>
                                        
                                        <p className={styles.horarioAcaoCategoria}>
                                          {acao.horario} - {acao.apelidoCartao}
                                        </p>
                                      </div>

                                      <div className={styles.infoAcaoCategoria}>
                                        <p className={styles.valorAcaoCategoria}>R$ {acao.valor.toFixed(2)}</p>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </ListaDeEntidade>
                          )
                        }
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

            {
              resumo.totalDespesas && (
                <div className={styles.metricasDespesas}>
                  <div className={styles.margemMetricasDespesas}>
                    <div className={styles.infosCategorias}>
                      <span>
                        <h1>Despesas</h1>
                      </span>
                    </div>

                    <div className={styles.cabecalhoMetricas}>
                      <h1 className={styles.valorTotal}>R$ {resumo.totalDespesas.toFixed(2)}</h1>
                    </div>

                    <BarraProgresso
                      maximo={resumo.totalDespesas}
                      inicial={resumo.totalDespesasLancadas}
                      compararValores={true}
                    />
                    
                    <div className={styles.totais}>
                      <span>
                        <div className={styles.indicador}></div>
                        R$ {resumo.totalDespesasLancadas.toFixed(2)}
                      </span>

                      <span>
                        <div className={styles.indicador2}></div>
                        R$ {(resumo.totalDespesas - resumo.totalDespesasLancadas).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

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