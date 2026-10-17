import ContainerMolde from '@/components/utils/ContainerMolde';
import styles from './Despesas.module.css';
import BarraProgresso from '@/components/utils/BarraProgresso';

export default function Despesas({totalDespesas, totalDespesasLancadas}){

  return (
    <ContainerMolde>
      <div className={styles.metricasDespesas}>
        <div className={styles.margemMetricasDespesas}>
          <div className={styles.infosDespesas}>
            <h1>Despesas</h1>
          </div>

          {
            totalDespesas ? (
              <>
                <div className={styles.cabecalhoMetricas}>
                  <h1 className={styles.valorTotal}>R$ {totalDespesas.toFixed(2)}</h1>
                </div>

                <BarraProgresso
                  maximo={totalDespesas}
                  inicial={totalDespesasLancadas}
                  compararValores={true}
                />
                
                <div className={styles.totais}>
                  <span>
                    <div className={styles.indicador}></div>
                    R$ {totalDespesasLancadas.toFixed(2)}
                  </span>

                  <span>
                    <div className={styles.indicador2}></div>
                    R$ {(totalDespesas - totalDespesasLancadas).toFixed(2)}
                  </span>
                </div>
              </>
            ) : <p className={styles.textoAlternativo}>Você ainda não possui despesas</p>
          }
          
        </div>
      </div>
    </ContainerMolde>
  );
}