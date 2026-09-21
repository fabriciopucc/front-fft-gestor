import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import useLoader from "./useLoader";
import useTratarErro from "./useTratarErro";
import { useLocation, useParams } from "react-router-dom";

import api from "@/services/api";
import useValidacoes from "./useValidacoes";
import useSaldo from "./useSaldo";
import useMessageBox from "./useMessageBox";


const useCartoes = () => {

  const [cartoes, setCartoes] = useState([]);
  const [cartao, setCartao] = useState({
    periodos: []
  });
  const {codigo} = useSessao();
  const {exibirCardLoader, esconderCardLoader, setCarregando} = useLoader();
  const location = useLocation();
  const {codigoCartao} = useParams();
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
      exibirMessageBox("", true, "Cartão cadastrado com sucesso!", "Prosseguir")
      setCartao({});
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const enviarFormularioCadastrarCartao = (e) => {
    e.preventDefault();
    if(validarCadastroCartao(cartao)) cadastrarCartao();
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

  const buscarCartaoDeUmUsuario = () => {
    setCarregando(true);
    api.get("/cartao/cartaoDeUmUsuario/usuario/".concat(codigo)+"/cartao/".concat(codigoCartao))
    .then((resp) => {
      setCartao(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    });
  }

  useEffect(() => {
    let caminho = location.pathname.split("/")[1];

    if(["cartoes", "adicionarAcao", "despesas"].includes(caminho)) listarCartoesDeUmUsuario();
    if(caminho == "fatura") buscarCartaoDeUmUsuario();
  }, []);
  

  return {cartao, preencherCartao, definirCorCartao, cartoes, enviarFormularioCadastrarCartao};
}

export default useCartoes;