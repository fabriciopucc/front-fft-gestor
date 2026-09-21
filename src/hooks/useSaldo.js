import { useContext,} from "react";
import useLoader from "./useLoader";
import useMessageBox from "./useMessageBox";

import api from "@/services/api";
import useTratarErro from "./useTratarErro";
import { SaldoContext } from "@/contexts/SaldoContext";
import useSessao from "./useSessao";


const useSaldo = () => {

  const {saldo, atualizarSaldo} = useContext(SaldoContext);
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {exibirMessageBox} = useMessageBox();
  const {tratarErro} = useTratarErro();
  const {codigo} = useSessao();

  const definirSaldoInicial = (e) => {
    exibirCardLoader();
    api.post("/saldo", {
      codigoUsuario: codigo,
      saldoInicial: document.getElementById("saldoInicial").value
    })
    .then(() => {
      esconderCardLoader();
      atualizarSaldo();
      exibirMessageBox("/menu", true, "Saldo iniciado com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  const reiniciarGestao = () => {
    exibirCardLoader();
    api.put("/saldo/".concat(codigo))
    .then(() => {
      atualizarSaldo();
      esconderCardLoader();
      exibirMessageBox("/menu", true, "Gestão reiniciada com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  return{saldo, atualizarSaldo, definirSaldoInicial, reiniciarGestao};
}

export default useSaldo;