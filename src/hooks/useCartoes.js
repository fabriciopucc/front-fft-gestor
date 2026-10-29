import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import useLoader from "./useLoader";
import useTratarErro from "./useTratarErro";
import { useLocation } from "react-router-dom";

import api from "@/services/api";
import useValidacoes from "./useValidacoes";
import useSaldo from "./useSaldo";
import useMessageBox from "./useMessageBox";


const useCartoes = () => {

  const [cartoes, setCartoes] = useState([]);
  const [cartao, setCartao] = useState({
    diaFechamento: 'escolha',
    periodos: []
  });
  const {codigo} = useSessao();
  const {exibirCardLoader, esconderCardLoader, setCarregando} = useLoader();
  const location = useLocation();
  const {tratarErro} = useTratarErro();
  const {validarCadastroCartao} = useValidacoes();
  const {atualizarSaldo} = useSaldo();
  const {exibirMessageBox} = useMessageBox();

  const preencherCartao = (e) => {
    setCartao({...cartao, [e.target.name] : e.target.value});
  }

  const definirCorCartao = (cor) => {
    setCartao({...cartao, ['cor'] : cor});
  }

  const cadastrarCartao = () => {
    exibirCardLoader();
    api.post("/cartao/paraUsuario", {...cartao, 
      codigoUsuario: codigo
    })
    .then(() => {
      esconderCardLoader();
      listarCartoesDeUmUsuario();
      atualizarSaldo();
      exibirMessageBox("", true, "Cartão cadastrado com sucesso!", "Prosseguir");
      setCartao({});
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const listarCartoesDeUmUsuario = () => {
    setCarregando(true);
    api.get("/cartao/cartoesDeUmUsuario/".concat(codigo))
    .then((resp) => {
      setCartoes(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    });
  }

  const listarCartoesDeUmUsuarioComLimitesFechadosEFuturos = () => {
    setCarregando(true);
    api.get("/cartao/cartoesDeUmUsuario/limitesFechadosEFuturos/".concat(codigo))
    .then((resp) => {
      setCartoes(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    });
  }

  const listarCartoesDeUmUsuarioSemLoading = () => {
    api.get("/cartao/cartoesDeUmUsuario/".concat(codigo))
    .then((resp) => {
      setCartoes(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  useEffect(() => {
    let caminho = location.pathname.split("/")[1];

    if(["adicionarAcao", "despesas"].includes(caminho)){
      listarCartoesDeUmUsuario();
    }
     else if(["cartoes"].includes(caminho)){
      listarCartoesDeUmUsuarioComLimitesFechadosEFuturos();
    }
    else if(["despesas"].includes(caminho)){
      listarCartoesDeUmUsuarioSemLoading();
    }
  }, []);

  const [visibilidadeAlterarLimite, setVisibilidadeAlterarLimite] = useState(false);
  const [novoLimite, setNovoLimite] = useState(0);

  const definirNovoLimite = (e) => {
    setNovoLimite(e.target.value);
  }

  const alterarLimite = (codigo) => {
    exibirCardLoader();
    api.put("/cartao/alterarLimite", {
      codigoCartao: codigo,
      novoLimite: novoLimite
    })
    .then((resp) => {
      setCartoes((cartoesAtuais) => 
        cartoesAtuais.map((cartao) => 
          (cartao.codigo === codigo) ? 
            resp.data : cartao
        )
      );
      atualizarSaldo();
      setNovoLimite(0);
      setVisibilidadeAlterarLimite(false);
      esconderCardLoader();
      exibirMessageBox("", true, "Limite atualizado com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const enviarFormularioCadastrarCartao = (e) => {
    e.preventDefault();
    if(validarCadastroCartao(cartao)) cadastrarCartao();
  }

  const enviarFormularioAlterarLimiteCartao = (e, codigo) => {
    e.preventDefault();
    alterarLimite(codigo);
  }
  
  
  return {
    cartao, preencherCartao, definirCorCartao,
    novoLimite, definirNovoLimite,
    visibilidadeAlterarLimite, setVisibilidadeAlterarLimite,
    cartoes, 
    enviarFormularioCadastrarCartao, enviarFormularioAlterarLimiteCartao
  };
}

export default useCartoes;