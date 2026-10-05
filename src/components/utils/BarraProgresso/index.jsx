import styles from './BarraProgresso.module.css';

export default function BarraProgresso({ inicial, atual, maximo, compararValores, corBarra}) {
  const porcentagemInicial = (inicial / maximo) * 100;
  const porcentagemAtual = ((atual - inicial) / maximo) * 100;

  return (
    <div className={styles.barra+" "+styles[(compararValores) && "vermelho"]}>
      <div
        className={styles.inicial+" "+styles[(compararValores) && "verde"]+" "+styles[corBarra]}
        style={{ width: `${porcentagemInicial}%` }}
      />
      
      <div
        className={styles.atual}
        style={{ width: `${porcentagemAtual}%` }}
      />
    </div>
  );
}