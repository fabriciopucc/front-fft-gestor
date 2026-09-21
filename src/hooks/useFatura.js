import { useEffect, useState } from "react";
import useMessageBox from "./useMessageBox";

import api from "@/services/api";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";
import useSaldo from "./useSaldo";


const useFatura = () => {

  const [compras, setCompras] = useState([]);
  const {exibirMessageBox} = useMessageBox();
  const {tratarErro} = useTratarErro();
  const [codigoPeriodo, setCodigoPeriodo] = useState();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {atualizarSaldo} = useSaldo();
  const {setCarregando} = useLoader();

  const definirCodigoPeriodoDaFatura = (codigoPeriodo) => {
    setCodigoPeriodo(codigoPeriodo);
  };

  const buscarComprasDeUmPeriodo = () => {
    setCarregando(true);
    api.get("/compra/periodo/".concat(codigoPeriodo))
    .then((resp) => {
      setCompras(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    })
  }

  const quitarCompra = (codigoCompra) => {
    exibirCardLoader();
    api.put("/compra/quitar/".concat(codigoCompra))
    .then((resp) => {
      esconderCardLoader();
      atualizarSaldo();
      exibirMessageBox('', true, "Compra quitada com sucesso!", "Prosseguir");
      setCompras(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  useEffect(() => {
    if(codigoPeriodo) buscarComprasDeUmPeriodo();
  }, [codigoPeriodo])

  return{definirCodigoPeriodoDaFatura, compras, quitarCompra};
}

export default useFatura;