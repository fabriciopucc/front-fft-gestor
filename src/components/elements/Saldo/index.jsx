import styles from './Saldo.module.css';

import useSaldo from '@/hooks/useSaldo';
import Loader from '../../utils/Loader';

import iconCartao from '@/assets/icons/card.png';
import iconCarteira from '@/assets/icons/wallet.png';

export default function Saldo() {
  const { saldo } = useSaldo();

  if (!saldo) {
    return <Loader />;
  }

  if (saldo.saldoInicial === 0) {
    return null;
  }

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
                <div className={styles.barraProgresso}>
                  <div
                    className={styles.barraPreenchida}
                    style={{ width: `${(saldo.totalLimiteUtilizado/saldo.totalLimiteTotal)*100}%` }}
                  />
                </div>

                <p className={styles.textoRodapeCredito}>{((saldo.totalLimiteUtilizado/saldo.totalLimiteTotal)*100).toFixed(2)}% Limite utilizado</p>
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

            {
              (saldo.saldoAtual > 0) && (
                <p className={styles.textoRodapeSaldo}>Disponível para uso</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

 