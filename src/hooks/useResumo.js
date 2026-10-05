import api from "@/services/api";
import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";

const useResumo = () => {

  const {codigo} = useSessao();
  const {tratarErro} = useTratarErro();
  const {setCarregando, exibirCardLoader, esconderCardLoader} = useLoader();

  const [filtroTipoDeUsoCategoria, setFiltroTipoDeUsoCategoria] = useState("saldo");
  
  const [resumo, setResumo] = useState({});

  const buscarResumoDeUmUsuario = () => {
    setCarregando(true);
    api.get("/resumo/".concat(codigo))
    .then((resp) => {
      setResumo(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    });
  }

  useEffect(() => {
    buscarResumoDeUmUsuario();
  }, []);


  //Filtros
  const [filtroPeriodo, setFiltroPeriodo] = useState({
    comSaldo: "semana",
    comCartao: "semana"
  });

  const alterarFiltroPeriodo = (tipo, periodo) => {
    setExibirAcoes({
      indice: -1,
      tipo: ""
    });
    setAcoesPorCategoria([]);
    setFiltroPeriodo({
      ...filtroPeriodo, 
        [tipo] : periodo 
    });
  }

  const [acoesPorCategoria, setAcoesPorCategoria] = useState([]);
  const [exibirAcoes, setExibirAcoes] = useState({
    indice: -1,
    tipo: "" 
  });

  const buscarAcoesPorCategoriaDeUmUsuario = (categoria, index, tipo) => {
    let filtro = (tipo == "comSaldo") ? filtroPeriodo.comSaldo : filtroPeriodo.comCartao;

    if(exibirAcoes.indice == index){
      setAcoesPorCategoria([]);
      setExibirAcoes({
        indice: -1,
        tipo: ""
      });
    }
    else{
      exibirCardLoader();
      api.post("/resumo/acoesPorCategoria", {
        codigoUsuario: codigo,
        categoria: categoria, 
        periodo: filtro
      })
      .then((resp) => {
        esconderCardLoader();
        setAcoesPorCategoria(resp.data);
        setExibirAcoes({
          indice: index,
          tipo: tipo
        });
      })
      .catch((error) => {
        tratarErro(error);
      });
    }
  }

  return{
    alterarFiltroPeriodo, filtroPeriodo,
    resumo, filtroTipoDeUsoCategoria, setFiltroTipoDeUsoCategoria,
    buscarAcoesPorCategoriaDeUmUsuario, acoesPorCategoria, exibirAcoes
  };
}

export default useResumo;