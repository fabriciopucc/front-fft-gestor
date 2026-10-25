import ContainerMolde from "@/components/utils/ContainerMolde";
import styles from "./Grafico.module.css";
import { Loader } from "@/components/utils";

export default function Grafico({ dados = [] }) {

  const maiorValor = Math.max(0, ...dados.map((item) => Number(item.gastoTotal) || 0));;

  const totalGastoGrafico = dados
  .reduce((soma, item) => soma + item.gastoTotal, 0);

  const totalGastoComDespesasGrafico = dados
  .reduce((soma, item) => soma + item.gastoComDespesas, 0);

  if(!dados.length){
    return <Loader/>
  }

  return (
    <ContainerMolde>
      <div className={styles.containerGrafico}>
        <div className={styles.margemContainerGrafico}>
          <span>
            <h1>Gastos nos últimos 7 dias</h1>
            <p>Saldo + cartão (não inclui receitas)</p>
          </span>

          <div className={styles.grafico}>
            {dados.map((item, index) => {
              const valorGastos = Number(item.gastoTotal) || 0;
              const valorDespesas = Number(item.gastoComDespesas) || 0;

              const alturaGastos =  maiorValor > 0 ? ((valorGastos - valorDespesas) / maiorValor) * 100 : 0;
              const alturaGastosComDespesas =  maiorValor > 0 ? (valorDespesas / maiorValor) * 100 : 0;

              const [ano, mes, dia] = item.data.split("-");

              return (
                <div className={styles.coluna} key={item.data}>
                  <span className={styles.valor}>
                    {valorGastos.toFixed(2)}
                  </span>

                  <div
                    className={styles.areaTorre}
                    role="img"
                    aria-label={`${dia}/${mes}/${ano}: ${valorGastos}`}
                  >
                    <div
                      className={styles.torre}
                      style={{ height: `${alturaGastos}%` }}
                    >
                      {((valorGastos - valorDespesas) > 0 && valorDespesas > 0) && (valorGastos - valorDespesas)}
                    </div>

                    <div
                      className={styles.torre2}
                      style={{ height: `${alturaGastosComDespesas}%` }}
                    >
                      {((valorGastos - valorDespesas) > 0 && valorDespesas > 0) && valorDespesas}
                    </div>
                  </div>

                  <span className={styles.data}>
                    {
                      index == 0 ? "hoje" :  dia+"/"+mes 
                    }
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.metricasGrafico}>
            <div>
              <span className={styles.tipoDeGasto}>
                <div className={styles.indicador}></div>
                <p>Despesas: R$ {totalGastoComDespesasGrafico.toFixed(2)}</p>
              </span>

              <span className={styles.tipoDeGasto}>
                <div className={styles.indicador}></div>
                <p>Gastos: R$ {(totalGastoGrafico - totalGastoComDespesasGrafico).toFixed(2)}</p>
              </span>
            </div>

            <div>
              <h1>R$ {totalGastoGrafico.toFixed(2)}</h1>
              <p>Total</p>
            </div>
          </div>
        </div>
      </div>
    </ContainerMolde>
  );
}