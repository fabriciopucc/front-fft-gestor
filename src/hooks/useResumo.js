import api from "@/services/api";
import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";

const useResumo = () => {

  const [usoCategorias, setUsoCategorias] = useState([]);
  const {codigo} = useSessao();
  const {tratarErro} = useTratarErro();
  const {setCarregando} = useLoader();

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
    })
    ;
  }

  useEffect(() => {
    buscarResumoDeUmUsuario();
  }, []);

  return{resumo, filtroTipoDeUsoCategoria, setFiltroTipoDeUsoCategoria};
}

export default useResumo;