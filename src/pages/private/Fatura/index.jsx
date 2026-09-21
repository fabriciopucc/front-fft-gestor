import styles from './Fatura.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';

import useCartoes from "@/hooks/useCartoes";
import useFatura from "@/hooks/useFatura";


export default function Fatura(){

  const {cartao} = useCartoes();
  const {definirCodigoPeriodoDaFatura, compras, quitarCompra} = useFatura();

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
      
      {
        compras.length ? (
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
                <p>Ações</p>
              </div>
              {
                compras.map((compra) => (
                  <div
                    key={compra.codigo}
                    className={styles.compra}
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

                    <div
                      className={styles.acoes}
                    >
                      <button
                        type="button"
                        disabled={compra.quitado}
                        className={(compra.quitado) ? "desativado" : ""}
                        onClick={() => quitarCompra(compra.codigo)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                )) 
              }
            </div>
          </div>
        ) : cartao.periodos.length ? (
          <p>Selecione um periodo para ver as compras</p>
        ) : (<></>)
      }
    </Container>
  )
}