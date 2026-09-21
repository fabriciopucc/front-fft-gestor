import { useState } from "react"
import { useParams } from "react-router-dom";
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";
import useTratarErro from "./useTratarErro";

import api from "@/services/api";
import useSaldo from "./useSaldo";


const useAcao = () => {

  const [acao, setAcao] = useState({
    valor: 0,
    formaPagamento: 'escolha',
    codigoCartao: '',
    apelidoCartao: '',
    tipoTransacao: 'saida',
    categoria: 'escolha',
  });

  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {exibirMessageBox} = useMessageBox();
  const {codigo} = useParams();
  const {tratarErro} = useTratarErro();
  const {atualizarSaldo} = useSaldo();

  const preencherAcao = (e) => {
    setAcao({...acao, [e.target.name] : e.target.value});
  }

  const definirFormaDePagamento = (e) => {
    let formaPagamento = e.target.value;

    setAcao(
      {...acao,
        ['formaPagamento'] : formaPagamento,
        ['tipoTransacao'] : (formaPagamento == "cartaoCredito") ? "cartaoCredito" : "saida"
      }
    );
  }

  const definirCategoriaAcao = (e) => {
    setAcao(
      {...acao,
        ['categoria'] : e.target.value,
        ['indiceIcon'] : parseInt(e.target.selectedOptions[0].id)
      }
    );
  }

  const definirCartao = (cartao) => {
    setAcao({...acao, 
      codigoCartao: parseInt(cartao.split("-")[0]),
      apelidoCartao: cartao.split("-")[1]
    });
  }

  const definirTipoTransacao = (e) => {
    setAcao({...acao, tipoTransacao: e.target.id})
  }

  const adicionarAcao = () => {
    exibirCardLoader();
    api.post("/acao", {...acao,
      codigoDia: parseInt(codigo),
    })
    .then(() => {
      esconderCardLoader();
      atualizarSaldo();
      exibirMessageBox("/gestao", true, "Ação adicionada com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const desfazerAcao = (codigo, setDias) => {
    exibirCardLoader();
    api.delete("/acao/".concat(codigo))
    .then((resp) => {
      esconderCardLoader();
      atualizarSaldo();
      exibirMessageBox("/gestao", true, "Ação desfeita com sucesso!", "Prosseguir");
      setDias(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const enviarFormularioAdicionarAcao = (e) => {
    e.preventDefault();
    adicionarAcao();
  }

  return{acao, definirCategoriaAcao, definirFormaDePagamento, definirCartao, definirTipoTransacao, preencherAcao, enviarFormularioAdicionarAcao, desfazerAcao};
}

export default useAcao;