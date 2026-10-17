import ContainerMolde from "@/components/utils/ContainerMolde";
import styles from "./Grafico.module.css";

export default function Grafico({ dados = [] }) {

  const maiorValor = Math.max(0, ...dados.map((item) => Number(item.valor) || 0));;

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
              const valor = Number(item.valor) || 0;
              const altura =  maiorValor > 0 ? (valor / maiorValor) * 100 : 0;
              const [ano, mes, dia] = item.data.split("-");

              return (
                <div className={styles.coluna} key={item.data}>
                  <span className={styles.valor}>
                    {valor.toFixed(2)}
                  </span>

                  <div
                    className={styles.areaTorre}
                    role="img"
                    aria-label={`${dia}/${mes}/${ano}: ${valor}`}
                  >
                    <div
                      className={styles.torre}
                      style={{ height: `${altura}%` }}
                    />
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
        </div>
      </div>
    </ContainerMolde>
  );
}