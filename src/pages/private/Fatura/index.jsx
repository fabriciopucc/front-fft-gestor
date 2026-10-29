import styles from './Fatura.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import BarraProgresso from '@/components/utils/BarraProgresso';
import ContainerMolde from '@/components/utils/ContainerMolde';
import categoriasIcons from '@/constants/categoriasIcons';

import useCartoes from "@/hooks/useCartoes";
import useFatura from "@/hooks/useFatura";
import { converterNumeroEmNumeroDeCalendario } from '@/utils/converterNumeroEmNumeroDeCalendario';


export default function Fatura(){

  const {
    periodos, codigoPeriodo,
    filtroFatura, setFiltroFatura, exibirSelecione, setExibirSelecione, listaCodigos, adicionarCodigo, setListaCodigos, definirCodigoPeriodoDaFatura, compras, quitarCompras
  } = useFatura();

  const comprasFiltradas = compras.filter((compra) => {
    return filtroFatura == "todas"
      ? true
      : filtroFatura == "pendentes"
        ? !compra.quitado
        : compra.quitado
  });


  let totalCompras = compras
    .reduce((soma, compra) => soma + compra.valor, 0);

  const totalPagas = compras
    .filter(compra => compra.quitado)
    .reduce((soma, compra) => soma + compra.valor, 0);

  return(
    <Container>
      <HeaderVoltar
        destino={"/cartoes"}
        tituloPagina={"Fatura"}
      />

      <ContainerMolde>
        <ListaDeEntidade
          lista={periodos}
          textoAlternativo={"Você ainda não utilizou esse cartão!"}
        >
          <select
            onChange={(e) => definirCodigoPeriodoDaFatura(e.target.value)}
            className={styles.definirPeriodo}
            value={codigoPeriodo || ""}
          >
            <option value={0}>Escolha o periodo</option>
            {
              periodos.map((periodo, index) => {
                const diaFechamento =converterNumeroEmNumeroDeCalendario(periodo.diaFechamento);
                const mes = converterNumeroEmNumeroDeCalendario(periodo.mes);
                const proximoMes = (periodo.mes == 12) ? "01" : converterNumeroEmNumeroDeCalendario(periodo.mes + 1);

                return (
                  <option 
                    key={index}
                    value={periodo.codigo}
                  >
                    de&nbsp;
                    {diaFechamento}/{mes}
                    &nbsp; até &nbsp;
                    {diaFechamento}/{proximoMes}
                  </option>
                )
              })
            }
          </select>
        </ListaDeEntidade>
        
        { 
          (exibirSelecione && codigoPeriodo > 0) ? (
            <div className={styles.botoesQuitacao}>
              <button
                type='button'
                onClick={() => {
                    setExibirSelecione(!exibirSelecione);
                    setFiltroFatura("todas");
                    setListaCodigos([]);
                  }
                }
              >
                Cancelar
              </button>

              <button
                type='button'
                disabled={!listaCodigos.length}
                className={(listaCodigos.length) ? "botaoPositivo" : "desativado"}
                onClick={quitarCompras}
              >
                {(listaCodigos.length) ? "Confirmar" : "Selecione (*)"}
              </button>
            </div>
          ) : (codigoPeriodo > 0) && (
            <div className={styles.botoesAcoes}>
              <button
                type='button'
                disabled={!compras.filter((compra) => !compra.quitado).length}
                className={styles.botaoSelecionarQuitacoes+" "+[compras.filter((compra) => !compra.quitado).length ? "" : "desativado"]}
                onClick={() => {
                    setExibirSelecione(!exibirSelecione);
                    setFiltroFatura("pendentes");
                  }
                }
              >
                Selecionar para quitar
              </button>

              <select onChange={(e) => setFiltroFatura(e.target.value)}>
                <option value="todas">Todas</option>
                <option value="pendentes">Pendentes</option>
                <option value="pagas">Pagas</option>
              </select>
            </div>
          )
        }

        <ListaDeEntidade
          lista={comprasFiltradas}
          textoAlternativo={"Sem compras para este filtro"}
        >
          <div
              className={styles.containerCompras}
            >
              <div
                className={styles.margemContainerCompras}
              >
                <div className={styles.metricasFatura}>
                  <div className={styles.cabecalhoMetricas}>
                    <h1 className={styles.valorTotal}>R$ {totalCompras.toFixed(2)}</h1>
                  </div>
  
                  <BarraProgresso
                    maximo={totalCompras}
                    inicial={totalPagas}
                    compararValores={true}
                  />
                  
                  <div className={styles.totais}>
                    <span>
                      <div className={styles.indicador}></div>
                      R$ {totalPagas.toFixed(2)}
                    </span>
  
                    <span>
                      <div className={styles.indicador2}></div>
                      R$ {(totalCompras - totalPagas).toFixed(2)}
                    </span>
                  </div>
                </div>

                {
                  comprasFiltradas
                  .slice().reverse()
                  .map((compra) => (
                    <div
                      key={compra.codigo}
                      className={
                        styles.compra+" "+
                        styles[(exibirSelecione) && "selecione"]+" "+
                        styles[(listaCodigos.includes(compra.codigo) && exibirSelecione) && "compraSelecionada"]
                      }
                      onClick={() => adicionarCodigo(compra.codigo)}
                    >
                      <div className={styles.molduraIcone+" "+styles[(compra.quitado) && "pago"]}>
                        <img 
                          src={(categoriasIcons[compra.indiceIcon - 1] ?? categoriasIcons[0]).src}
                          alt="Icon" 
                        />
                      </div>

                      <div className={styles.dadosCompra}>
                        <span>
                          <p>{compra.descricao}</p>
                          <p>{converterNumeroEmNumeroDeCalendario(compra.dia)}/{converterNumeroEmNumeroDeCalendario(compra.mes)}</p>
                        </span>

                        <span>
                          <p>R$ {compra.valor.toFixed(2)}</p>
                          
                          <p className={(compra.quitado) ? "valorPositivo" : "valorNegativo"}>{compra.quitado ? "Pago" : "Pendente"}</p>
                        </span>
                      </div>
                    </div>
                  )) 
                }
              </div>
            </div>
        </ListaDeEntidade>
      </ContainerMolde>
    </Container>
  )
}