import { useLocation, useNavigate } from "react-router-dom";
import useSessao from "./useSessao";

import privateRoutes from "@/constants/privateRoutes";
import publicRoutes from "@/constants/publicRoutes";


const useRoutes = () => {

  const locattion = useLocation();
  const navigate = useNavigate();
  const {sessao} = useSessao();

  const verificarSeARotaEPublica = () => {
    return publicRoutes.includes(locattion.pathname);
  }

  const verificarSeARotaEPrivada = () => {
    let caminhoSemParametros = "/".concat(locattion.pathname.split("/")[1]);
    return privateRoutes.includes(caminhoSemParametros);
  }

  const redirecionarParaMenu = () => {
    if(sessao){
      navigate("/menu");
    }
  }

  const redirecionarParaHome = () => {
    if(!sessao){
      navigate("/");
    }
  }

  return{
    verificarSeARotaEPublica, redirecionarParaMenu,
    verificarSeARotaEPrivada, redirecionarParaHome
  };
}

export default useRoutes;