import styles from './Fatura.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';

import useCartoes from "@/hooks/useCartoes";
import useFatura from "@/hooks/useFatura";


export default function Fatura(){

  const {cartao} = useCartoes();
  const {filtroFatura, setFiltroFatura, exibirSelecione, setExibirSelecione, listaCodigos, adicionarCodigo, setListaCodigos, definirCodigoPeriodoDaFatura, compras, quitarCompras} = useFatura();

  const comprasFiltradas = compras.filter((compra) => {
    return filtroFatura == "todas"
      ? true
      : filtroFatura == "pendentes"
        ? !compra.quitado
        : compra.quitado
  });

  return(
    <Container>
      <HeaderVoltar
        destino={"/cartoes"}
        tituloPagina={"Fatura"}
      />

      <ListaDeEntidade
        lista={cartao.periodos}
        textoAlternativo={"Você ainda não utilizou esse cartão!"}
      >
        <select
          onChange={(e) => definirCodigoPeriodoDaFatura(e.target.value)}
          className={styles.definirPeriodo}
        >
          <option value="escolha">Escolha o periodo</option>
          {
            cartao.periodos.map((periodo, index) => (
              <option 
                key={index}
                value={periodo.codigo}
              >
                {["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"][periodo.mes - 1]}
                /{periodo.ano}
              </option>
            ))
          }
        </select>
      </ListaDeEntidade>

      <ListaDeEntidade
        lista={comprasFiltradas}
        textoAlternativo={"Selecione uma fatura"}
      >
        {
          exibirSelecione ? (
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
          ) : (
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

        <div
            className={styles.containerCompras}
          >
            <div
              className={styles.margemContainerCompras}
            >
              <div
                className={styles.compra}
              >
                <p>Dia</p>
                <p>Descrição</p>
                <p>Valor</p>
                <p>Quitado</p>
              </div>
              {
                comprasFiltradas.map((compra) => (
                  <div
                    key={compra.codigo}
                    className={
                      styles.compra+" "+
                      styles[(exibirSelecione) && "selecione"]+" "+
                      styles[(listaCodigos.includes(compra.codigo) && exibirSelecione) && "selecionado"]
                    }
                    onClick={() => {
                        if(exibirSelecione && !compra.quitado) adicionarCodigo(compra.codigo);
                      }
                    }
                  >
                    <div>
                      <p>{compra.dia}</p>
                    </div>

                    <div>
                      <p>{compra.descricao}</p>
                    </div>

                    <div>
                      <p>R$ {compra.valor.toFixed(2)}</p>
                    </div>

                    <div
                      className={styles.quitado}
                    >
                      <span className={styles.statusQuitado+" "+styles[(compra.quitado) && "foiQuitado"]}></span>
                    </div>
                  </div>
                )) 
              }
            </div>
          </div>
      </ListaDeEntidade>
    </Container>
  )
}