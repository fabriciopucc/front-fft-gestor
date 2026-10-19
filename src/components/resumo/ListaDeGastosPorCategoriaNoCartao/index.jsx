import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import styles from './ListaDeGastosPorCategoriaNoCartao.module.css';
import categoriasIcons from '@/constants/categoriasIcons';
import iconSetaParaBaixo from '@/assets/icons/iconSetaParaBaixo.svg';
import converterDataAmericanaEmBrasileira from '@/utils/converterDataAmericanaEmBrasileira';
import ContainerMolde from '@/components/utils/ContainerMolde';

export default function ListaGastosPorCategoriaNoCartao({listaGastosPorCategoriaNoCartao, filtroPeriodo, alterarFiltroPeriodo, buscarAcoesPorCategoriaDeUmUsuario, exibirAcoes, acoesPorCategoria}){


  const totalGastosComCartao = listaGastosPorCategoriaNoCartao
  .reduce((soma, categoria) => soma + categoria.valorGasto, 0);

  return(
    <ContainerMolde>
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
              <p>{filtroPeriodo.comCartao == "semana" ? "Última semana" : "Último mês"}</p>       
            </span>
          </div>
          
          <ListaDeEntidade
            lista={listaGastosPorCategoriaNoCartao}
            textoAlternativo={"Você ainda não possui nenhum gasto por categoria usando cartão"}
          >
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
                        className={styles.iconSeta+" "+styles[(exibirAcoes.indice == index && exibirAcoes.tipo == "comCartao") && "iconInvertido"]}
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
                              .filter((acao) => ['cartaoCredito', 'quitado'].includes(acao.tipoTransacao))
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
          </ListaDeEntidade>
        </div>
      </div>
    </ContainerMolde>
  );
}