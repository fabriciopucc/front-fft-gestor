import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import useLoader from "./useLoader";
import useTratarErro from "./useTratarErro";

import api from "@/services/api";
import useMessageBox from "./useMessageBox";
import usePaginacao from "./usePaginacao";


const useDias = () => {

  const {codigo} = useSessao();
  const [data, setData] = useState();
  const [dias, setDias] = useState([]);
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader, setCarregando} = useLoader();
  const {tratarErro} = useTratarErro();
  const {paginacao, avancarPagina, retrocederPagina, atualizarQuantidadeDePaginas} = usePaginacao();

  const listarDias = () => {
    setCarregando(true);
    api.get("/dia/".concat(codigo), {
      params: paginacao
    })
    .then((resp) => {
      setDias(resp.data.content);
      atualizarQuantidadeDePaginas(resp.data.totalPages);
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
  }, [paginacao.page]);

  const criarDia = () => {
    exibirCardLoader();
    api.post("/dia", {
      codigoUsuario: codigo,
      data: data
    }, {
      params: paginacao
    })
    .then((resp) => {
      atualizarQuantidadeDePaginas(resp.data.totalPages);
      setDias(resp.data.content);
      setData('');
      esconderCardLoader();
      exibirMessageBox("/gestao", true, "Dia criado com sucesso!", "Prosseguir");;
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  return{
    data, setData, criarDia, dias, setDias,
    paginacao, avancarPagina, retrocederPagina
  };
}

export default useDias;