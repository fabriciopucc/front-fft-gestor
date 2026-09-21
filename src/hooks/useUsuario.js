import { useEffect, useState } from "react"
import useSessao from "./useSessao";
import useMessageBox from "./useMessageBox";
import useValidacoes from "./useValidacoes";
import useLoader from './useLoader';
import { useLocation } from "react-router-dom";

import api from "@/services/api";
import useTratarErro from "./useTratarErro";
import useSaldo from "./useSaldo";


const useUsuario = () => {

  const [usuario, setUsuario] = useState({
    email: '',
    emailDefinido: 'diferente'
  });
  const {logar} = useSessao();
  const {exibirMessageBox} = useMessageBox();
  const {validarCadastroUsuario, validarLogin, validarRecuperarSenha, validarAlterarSenha} = useValidacoes();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {codigo} = useSessao();
  const [indiceCadastroForm, setIndiceCadastroForm] = useState(0);
  const [indiceRecuperarSenhaForm, setIndiceRecuperarSenhaForm] = useState(0);
  const {tratarErro} = useTratarErro();
  const {atualizarSaldo} = useSaldo();

  const preencherUsuario = (e) => {
    setUsuario({...usuario, [e.target.name] : e.target.value});
  }

  const solicitarCodigoDeConfirmacao = () => {
    exibirCardLoader();
    api.post("/codigoConfirmacao/".concat(usuario.email))
    .then(() => {
      esconderCardLoader();
      setUsuario({...usuario, emailDefinido: usuario.email});
      exibirMessageBox("", true, "Código enviado com sucesso!", "Prosseguir");

      setIndiceCadastroForm(1);
      setIndiceRecuperarSenhaForm(1);
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  const fazerCadastro = () => {
    exibirCardLoader();
    api.post("/usuario", usuario)
    .then(() => {
      esconderCardLoader();
      exibirMessageBox("/login", true, "Usuário cadastrado com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const fazerLogin = () => {
    exibirCardLoader();
    api.post("/usuario/login", usuario)
    .then((resp) => {
      esconderCardLoader();
      logar(resp.data);
      atualizarSaldo();
      exibirMessageBox("/menu", true, "Logado com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const recuperarSenha = () => {
    exibirCardLoader();
    api.put("/usuario/recuperarSenha", usuario)
    .then(() => {
      esconderCardLoader();
      exibirMessageBox("/login", true, "Senha recuperada com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  const alterarSenha = () => {
    exibirCardLoader();
    api.put("/usuario/alterarSenha",
      {...usuario, 
        codigo: codigo
      }
    )
    .then(() => {
      esconderCardLoader();
      exibirMessageBox("/meuPerfil", true, "Senha alterada com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const enviarFormularioFazerCadastro = (e) => {
    e.preventDefault();
    if(validarCadastroUsuario(usuario)) fazerCadastro();
  }

  const enviarFormularioFazerLogin = (e) => {
    e.preventDefault();
    if(validarLogin(usuario)) fazerLogin();
  }

  const enviarFormularioRecuperarSenha = (e) => {
    e.preventDefault();
    if(validarRecuperarSenha(usuario)) recuperarSenha();
  }

   const enviarFormularioAlterarSenha = (e) => {
    e.preventDefault();
    if(validarAlterarSenha(usuario)) alterarSenha();
  }

  
  return{
    usuario, preencherUsuario, 
    indiceCadastroForm, setIndiceCadastroForm, solicitarCodigoDeConfirmacao, indiceRecuperarSenhaForm, setIndiceRecuperarSenhaForm,
    enviarFormularioFazerCadastro, enviarFormularioFazerLogin, enviarFormularioRecuperarSenha, enviarFormularioAlterarSenha
  };
}

export default useUsuario;