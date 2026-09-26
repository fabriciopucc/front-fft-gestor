import useSaldo from "@/hooks/useSaldo";

export default function ConfiguracaoForm(){

  const {saldoInicial, preecherSaldoInicial, saldo, definirSaldoInicial, reiniciarGestao} = useSaldo();

  return(
    <form>
      <input 
        type="number" 
        placeholder="Digite o valor"
        onChange={(e) => preecherSaldoInicial(e)}
        id='saldoInicial'
        readOnly={(saldo.saldoInicial > 0)}
      />

      <button
        type="button"
        onClick={definirSaldoInicial}
        disabled={(saldo.saldoInicial > 0 || !saldoInicial)}
        className={[(saldo.saldoInicial > 0 || !saldoInicial) && "desativado"]}
      >
        Iniciar gestão
      </button>

      <button
        type="button"
        onClick={reiniciarGestao}
        disabled={(saldo.saldoInicial == 0)}
        className={[(saldo.saldoInicial == 0) && "desativado"]}
      >
        Reiniciar gestão
      </button>
    </form>
  );
}