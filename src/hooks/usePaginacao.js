import { PaginacaoContext } from "@/contexts/PaginacaoContext";
import { useContext, useState } from "react";

const usePaginacao = () => {

  const {paginacao, avancarPagina, retrocederPagina, atualizarQuantidadeDePaginas} = useContext(PaginacaoContext)

  return{paginacao, avancarPagina, retrocederPagina, atualizarQuantidadeDePaginas};
}

export default usePaginacao;