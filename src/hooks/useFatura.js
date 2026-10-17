import { useEffect, useState } from "react";
import useMessageBox from "./useMessageBox";

import api from "@/services/api";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";
import useSaldo from "./useSaldo";
import { useParams } from "react-router-dom";


const useFatura = () => {

  const [compras, setCompras] = useState([]);
  const {exibirMessageBox} = useMessageBox();
  const {tratarErro} = useTratarErro();
  const [periodos, setPeriodos] = useState([]);
  const {codigoCartao} = useParams();
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

  const listarPeriodosDeUmCartao = () => {
    setCarregando(true);
    api.get("/periodo/periodosDeUmCartao/".concat(codigoCartao))
    .then((resp) => {
      setPeriodos(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    })
  }

  const buscarComprasDeUmPeriodo = () => {
    if(codigoPeriodo == 0){
      setCompras([]);
    }
    else{
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
      });
    }
  }

  const quitarCompras = () => {
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
    listarPeriodosDeUmCartao();
  }, []);

  useEffect(() => {
    if(codigoPeriodo > 0) buscarComprasDeUmPeriodo();
  }, [codigoPeriodo]);

  return{
    periodos, codigoPeriodo,
    filtroFatura, setFiltroFatura,
    exibirSelecione, setExibirSelecione,
    listaCodigos, adicionarCodigo, setListaCodigos,
    definirCodigoPeriodoDaFatura, compras, quitarCompras
  };
}

export default useFatura;