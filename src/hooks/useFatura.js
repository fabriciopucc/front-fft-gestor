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


  const [exibirSelecione, setExibirSelecione] = useState(false);
  const [listaCodigos, setListaCodigos] = useState([]);

  const [filtroFatura, setFiltroFatura] = useState("todas");

  const adicionarCodigo = (codigo) => {
      setListaCodigos((listaAtual) => {
        if (listaAtual.includes(codigo)) {
            return listaAtual.filter((item) => item !== codigo);
        }

        return [...listaAtual, codigo];
      });
  };

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

  const quitarCompras = () => {

    console.log(listaCodigos)
    exibirCardLoader();
    api.put("/compra/quitarCompras", listaCodigos)
    .then((resp) => {
      setFiltroFatura("/todas");
      setExibirSelecione(!setExibirSelecione);
      esconderCardLoader();
      atualizarSaldo();
      exibirMessageBox('', true, "Compras quitadas com sucesso!", "Prosseguir");
      setCompras(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  useEffect(() => {
    if(codigoPeriodo) buscarComprasDeUmPeriodo();
  }, [codigoPeriodo])

  return{
    filtroFatura, setFiltroFatura,
    exibirSelecione, setExibirSelecione,
    listaCodigos, adicionarCodigo, setListaCodigos,
    definirCodigoPeriodoDaFatura, compras, quitarCompras
  };
}

export default useFatura;