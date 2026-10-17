import categoriasIcons from '@/constants/categoriasIcons';
import ListaDeEntidade from '../../lists/ListaDeEntidade';
import styles from './ListaDeGastosPorCategoriaNoSaldo.module.css';
import iconSetaParaBaixo from '@/assets/icons/iconSetaParaBaixo.svg';
import converterDataAmericanaEmBrasileira from '@/utils/converterDataAmericanaEmBrasileira';
import ContainerMolde from '@/components/utils/ContainerMolde';

export default function ListaGastosPorCategoriaNoSaldo({filtroPeriodo, alterarFiltroPeriodo, buscarAcoesPorCategoriaDeUmUsuario, listaGastosPorCategoriaNoSaldo, exibirAcoes, acoesPorCategoria}){

  
  const receitasComSaldo = listaGastosPorCategoriaNoSaldo
  .reduce((soma, categoria) =>
    soma + (categoria.valorGasto > 0 ? categoria.valorGasto : 0)
  , 0);

  const gastosComSaldo = listaGastosPorCategoriaNoSaldo
  .reduce((soma, categoria) =>
    soma + (categoria.valorGasto < 0 ? categoria.valorGasto : 0)
  , 0);

  let balancoComSaldo = receitasComSaldo + gastosComSaldo;

  return(
    <ContainerMolde>
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
              <p>{filtroPeriodo.comSaldo == "semana" ? "Última semana" : "Último mês"}</p>
            </span>
          </div>
          
          <ListaDeEntidade
            lista={listaGastosPorCategoriaNoSaldo}
            textoAlternativo={"Você ainda não possui nenhum gasto por categoria usando saldo"}
          >
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
                      className={styles.iconSeta+" "+styles[(exibirAcoes.indice == index && exibirAcoes.tipo == "comSaldo") && "iconInvertido"]}
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
          </ListaDeEntidade>
        </div>
      </div>
    </ContainerMolde>
  );
}