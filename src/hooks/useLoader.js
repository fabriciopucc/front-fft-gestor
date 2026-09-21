import { useContext } from "react"

import { LoaderContext } from "@/contexts/LoaderContext";


const useLoader = () => {

  const {
    visibilidadeCardLoader, exibirCardLoader, esconderCardLoader,
    carregando, setCarregando
  } = useContext(LoaderContext);

  return{
    visibilidadeCardLoader, exibirCardLoader, esconderCardLoader,
    carregando, setCarregando
  };
}

export default useLoader;