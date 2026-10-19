import styles from './Saldo.module.css';

import useSaldo from '@/hooks/useSaldo';
import Loader from '../../utils/Loader';

import iconCartao from '@/assets/icons/iconCard.svg';
import iconCarteira from '@/assets/icons/iconCarteira.svg';
import BarraProgresso from '@/components/utils/BarraProgresso';
import { useLocation } from 'react-router-dom';
import ContainerMolde from '@/components/utils/ContainerMolde';

export default function Saldo() {
  const { saldo } = useSaldo();
  const location = useLocation();

  if (!saldo) {
    return <Loader />;
  }

  if (saldo.saldoInicial === 0) {
    return null;
  }

  let balancoSaldo = saldo.saldoAtual - saldo.saldoInicial;


  return (
    <ContainerMolde
      classeAdicional={"semBordaSuperior"}
    >
      <div className={styles.saldo}>
        <div className={styles.margemSaldo}>
          <img 
            src={iconCartao} 
            alt="Icone cartão" 
            className={styles.iconCartao}  
          />

          <div className={styles.divisorDados}>
            <p className={styles.tituloSaldo}>Limites cartões</p>

            {
              (saldo.totalLimiteTotal) ? (
                <div className={styles.credito}>
                  <div className={styles.valoresCredito}>
                    <h1>R$ {(saldo.totalLimiteUtilizado).toFixed(2)}</h1>
                    <p>&nbsp; / R$ {(saldo.totalLimiteTotal).toFixed(2)}</p>
                  </div>

                  {
                    saldo.totalLimiteUtilizado > 0 && (
                      <div className={styles.porcentagem}>
                        <BarraProgresso
                          maximo={saldo.totalLimiteTotal}
                          inicial={saldo.totalLimiteUtilizado}
                        />

                        <p>&nbsp;&nbsp;</p>

                        <p className={styles.valorPorcentagem}>
                          {((saldo.totalLimiteUtilizado/saldo.totalLimiteTotal)*100).toFixed(2)}%
                        </p> 
                      </div>
                    )
                  }
                </div>
              ) : (
                <>
                  <p>Sem cartões até o momento!</p>
                </>
              )
            }

            {(saldo.totalLimiteTotal > 0 && saldo.totalLimiteUtilizado > 0) && (
              <>
                {
                  (saldo.totalLimiteUtilizado - saldo.totalLimitesFaturasAtuaisUtilizado) > 0 && (
                    <div className={styles.metricas}>
                      <div className={styles.metricasCredito}>
                        <div className={styles.margemMetricasCartao}>
                          <p>Fechadas</p>
                          <h1 className={styles.limiteUtilizado}>R$ {(saldo.totalLimitesFaturasPassadasUtilizado).toFixed(2)}</h1>
                        </div>
                      </div>

                      <div className={styles.metricasCredito}>
                        <div className={styles.margemMetricasCartao}>
                          <p>Atual</p>
                          <h1 className={styles.limiteUtilizado}>R$ {(saldo.totalLimitesFaturasAtuaisUtilizado).toFixed(2)}</h1>
                        </div>
                      </div>

                      <div className={styles.metricasCredito}>
                        <div className={styles.margemMetricasCartao}>
                          <p>Futuras</p>
                          <h1 className={styles.limiteUtilizado}>R$ {(saldo.totalLimitesFaturasFuturasUtilizado).toFixed(2)}</h1>
                        </div>
                      </div>
                    </div>
                  )
                }
              </>
            )}

            {
              location.pathname == "/resumo" && (
                <>
                  <br/>

                  <p className={styles.textoRodapeCredito}>
                    Limite disponível: R$ {(saldo.totalLimiteTotal - saldo.totalLimiteUtilizado).toFixed(2)}
                  </p>
                </>
              )
            }
          </div>
        </div>
      </div>

      <div className={styles.saldo+" "+styles[(saldo.saldoAtual < 0) ? "cardNegativo" : "cardPositivo"]}>
        <div className={styles.margemSaldo}>
          <img 
            src={iconCarteira} 
            alt="Icone dinheiro" 
            className={styles.iconCarteira+" "+styles[(saldo.saldoAtual < 0) ? "carteiraNegativa" : ""]}  
          />

          <div className={styles.divisorDados}>
            <p className={styles.tituloSaldo}>Saldo disponível</p>

            <h1 className={styles.valorSaldoEmConta}>R$ {(saldo.saldoAtual).toFixed(2)}</h1>

            <div>
              {
                (saldo.saldoAtual > 0 && location.pathname != "/resumo") && (
                  <p className={styles.textoRodapeSaldo}>
                    Disponível para uso
                  </p>
                )
              }

              {
                (location.pathname == "/resumo") && (
                  <p className={styles.textoRodapeSaldo+" "+styles[(balancoSaldo < 0) && "valorNegativo"]}>
                    {(balancoSaldo < 0) ? "- " : (balancoSaldo > 0) ? "+ " : ""}
                    R$ {Math.abs(balancoSaldo).toFixed(2)} desde o ínicio da gestão
                  </p>
                )
              } 
            </div>
          </div>
        </div>
      </div>
    </ContainerMolde>
  );
}

 