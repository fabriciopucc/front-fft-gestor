import { useState } from "react";

const usePaginacao = () => {

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

  return{paginacao, avancarPagina, retrocederPagina, atualizarQuantidadeDePaginas};
}

export default usePaginacao;