import { useEffect, useState } from "react";
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";
import useSessao from "./useSessao";
import useValidacoes from "./useValidacoes";
import useTratarErro from "./useTratarErro";

import api from "@/services/api";


const useCategorias = () => {

  const [categorias, setCategorias] = useState([]);
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader, setCarregando} = useLoader();
  const {codigo} = useSessao();
  const {validarCadastroCategoria} = useValidacoes();
  const {tratarErro} = useTratarErro();

  const [categoria, setCategoria] = useState({
    nome: '',
    indiceIcon: ''
  });

  const listarCategorias = () => {
    setCarregando(true);
    api.get("/categoria/".concat(codigo))
    .then((resp) => {
      setCategorias(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    });
  }

  useEffect(() => {
    listarCategorias();
  }, []);

  const preencherCategoria = (e) => {
    setCategoria({...categoria, [e.target.name] : e.target.value});
  };

  const selecionarIconCategoria = (indiceIcon) => {
    setCategoria({...categoria, ['indiceIcon'] : indiceIcon});
  };

  const salvarCategoria = () => {
    exibirCardLoader();
    api.post("/categoria", 
      {...categoria,
        codigoUsuario: codigo
      }
    )
    .then((resp) => {
      setCategorias(resp.data);
      esconderCardLoader();
      exibirMessageBox("", false, "Categoria cadastrada com suceso!", "Prosseguir");
      setCategoria({
        nome: '',
        indiceIcon: ''
      });
    })
    .catch((error) => {
      tratarErro(error);
    });
  } 

  const excluirCategoria = (codigo) => {
    exibirCardLoader();
    api.delete("/categoria/".concat(codigo))
    .then((resp) => {
      setCategorias(resp.data);
      esconderCardLoader();
      exibirMessageBox('', true, "Categoria excluida com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const enviarFormularioSalvarCategoria = (e) => {
    e.preventDefault();
    if(validarCadastroCategoria(categoria)) salvarCategoria();
  }

  return{categorias, categoria, preencherCategoria, selecionarIconCategoria, enviarFormularioSalvarCategoria, excluirCategoria};
}

export default useCategorias;