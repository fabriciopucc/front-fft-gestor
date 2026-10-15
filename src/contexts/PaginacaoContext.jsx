import { createContext, useState } from "react";

export const PaginacaoContext = createContext();

export const PaginacaoProvider = ({children}) => {

  const [paginacao, setPaginacao] = useState({
    size: 7,
    page: 0,
    totalPages: 0
  });

  const avancarPagina = () => {
    setPaginacao((atual) => ({
      ...atual,
      page: atual.page + 1
    }));
  }

  const retrocederPagina = () => {
    setPaginacao((atual) => ({
      ...atual,
        page: atual.page - 1
    }));
  }

  const atualizarQuantidadeDePaginas = (quantidade) => {
    setPaginacao(
      {...paginacao, 
        totalPages: quantidade
      })
    ;
  }

  return(
    <PaginacaoContext.Provider
      value={{paginacao, avancarPagina, retrocederPagina, atualizarQuantidadeDePaginas}}
    >
      {children}
    </PaginacaoContext.Provider>
  )
}