import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import useLoader from "./useLoader";
import useTratarErro from "./useTratarErro";

import api from "@/services/api";
import useMessageBox from "./useMessageBox";


const useDias = () => {

  const {codigo} = useSessao();
  const [data, setData] = useState();
  const [dias, setDias] = useState([]);
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader, setCarregando} = useLoader();
  const {tratarErro} = useTratarErro();

  const listarDias = () => {
    setCarregando(true);
    api.get("/dia/".concat(codigo))
    .then((resp) => {
      setDias(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    });
  }

  useEffect(() => {
    listarDias();
  }, []);

  const criarDia = () => {
    exibirCardLoader();
    api.post("/dia", {
      codigoUsuario: codigo,
      data: data,
    })
    .then((resp) => {
      setData('');
      esconderCardLoader();
      exibirMessageBox("/gestao", true, "Dia criado com sucesso!", "Prosseguir");
      setDias(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  return{data, setData, criarDia, dias, setDias};
}

export default useDias;