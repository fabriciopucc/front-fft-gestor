import styles from './Estatisticas.module.css';

import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";
import useSaldo from '@/hooks/useSaldo';

export default function Estatisticas(){

  const {saldo} = useSaldo();

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
      />

      <div className={styles.estatisticas}>
        <div className={styles.margemEstatisticas}>
          <label htmlFor="">Saldo</label>
          <p>R$ {saldo.saldoAtual.toFixed(2)}</p>

          <label htmlFor="">Limite utilizado / total</label>
          <p>R$ {saldo.totalLimiteUtilizado.toFixed(2)}/{saldo.totalLimiteTotal.toFixed(2)}</p>

          <label htmlFor="">Saldo - Limite utilizado</label>
          <p>R$ {(saldo.saldoAtual - saldo.totalLimiteUtilizado).toFixed(2)}</p>
        </div>
      </div>
    </Container>
  )
}