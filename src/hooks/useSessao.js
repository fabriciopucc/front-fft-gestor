import { useContext } from "react";

import {SessaoContext} from '@/contexts/SessaoContext'


const useSessao = () => {

  const {logar, deslogar, sessao, codigo, setSessao} = useContext(SessaoContext);

  return{logar, deslogar, sessao, codigo, setSessao};
}

export default useSessao;