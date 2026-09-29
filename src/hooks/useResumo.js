import api from "@/services/api";
import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import useTratarErro from "./useTratarErro";

const useResumo = () => {

  const [usoCategorias, setUsoCategorias] = useState([]);
  const {codigo} = useSessao();
  const {tratarErro} = useTratarErro();

  const [filtroTipoDeUsoCategoria, setFiltroTipoDeUsoCategoria] = useState("saldo");
  
  const [resumo, setResumo] = useState({});

  useEffect(() => {
    api.get("/resumo/".concat(codigo))
    .then((resp) => {
      setResumo(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    });
  }, []);

  return{resumo, filtroTipoDeUsoCategoria, setFiltroTipoDeUsoCategoria};
}

export default useResumo;