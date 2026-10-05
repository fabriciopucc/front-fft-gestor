import styles from './Saldo.module.css';

import useSaldo from '@/hooks/useSaldo';
import Loader from '../../utils/Loader';

import iconCartao from '@/assets/icons/iconCard.svg';
import iconCarteira from '@/assets/icons/iconCarteira.svg';
import BarraProgresso from '@/components/utils/BarraProgresso';
import { useLocation } from 'react-router-dom';

export default function Saldo() {
  const { saldo } = useSaldo();

  if (!saldo) {
    return <Loader />;
  }

  if (saldo.saldoInicial === 0) {
    return null;
  }

  const location = useLocation();
  let balancoSaldo = saldo.saldoAtual - saldo.saldoInicial;

  return (
    <div className={styles.containerSaldo}>
      <div className={styles.saldo}>
        <div className={styles.margemSaldo}>
          <img 
            src={iconCartao} 
            alt="Icone cartão" 
            className={styles.iconCartao}  
          />

          <div className={styles.divisorDados}>
            <p className={styles.tituloSaldo}>Limites cartões</p>

            <div className={styles.valoresCredito}>
              {
                (saldo.totalLimiteTotal) ? (
                  <>
                    <h1>R$ {(saldo.totalLimiteUtilizado).toFixed(2)}</h1>
                    <p>&nbsp; / R$ {(saldo.totalLimiteTotal).toFixed(2)}</p>
                  </>
                ) : (
                  <>
                    <h1>-</h1>
                    <p>-</p>
                  </>
                )
              }
              
            </div>

            {(saldo.totalLimiteTotal > 0 && saldo.totalLimiteUtilizado > 0) && (
              <>
                <BarraProgresso
                  maximo={saldo.totalLimiteTotal}
                  inicial={saldo.totalLimiteUtilizado}
                />

                <p className={styles.textoRodapeCredito}>
                  {((saldo.totalLimiteUtilizado/saldo.totalLimiteTotal)*100).toFixed(2)}% Limite utilizado
                  
                  {
                    location.pathname == "/resumo" && (
                      <>
                        <br />
                        Limite disponível: R$ {(saldo.totalLimiteTotal - saldo.totalLimiteUtilizado).toFixed(2)}
                      </>
                    )
                  }
                </p> 
              </>
            )}
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
    </div>
  );
}

 