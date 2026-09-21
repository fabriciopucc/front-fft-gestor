import { createContext, useEffect, useState } from "react";

export const SessaoContext = createContext();

export const SessaoProvider = ({children}) => {

  const [sessao, setSessao] = useState(() => {
    let sessao = localStorage.getItem('sessao');
    return (sessao) ? JSON.parse(sessao) : null;
  });

  let codigo = (sessao) ? sessao.codigo : null;

  const logar = (sessao) => {
    setSessao(sessao);
  }

  const deslogar = () => {
    setSessao(false);
  }

  useEffect(() => {
    localStorage.setItem('sessao', JSON.stringify(sessao));
  }, [sessao]);

  return(
    <SessaoContext.Provider
      value={{logar, deslogar, sessao, codigo, setSessao}}
    >
      {children}
    </SessaoContext.Provider>
  )
}