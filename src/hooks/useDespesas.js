import { useEffect, useState } from "react"
import useMessageBox from "./useMessageBox";
import useSessao from "./useSessao";
import useLoader from "./useLoader";
import useSaldo from "./useSaldo";
import useTratarErro from "./useTratarErro";

import api from "@/services/api";
import useValidacoes from "./useValidacoes";


const useDespesas = () => {

  const [despesas, setDespesas] = useState([]);

  const [despesa, setDespesa] = useState({
    descricao: '',
    diaVencimento: 'escolha',
    formaPagamento: 'escolha',
    valor: 0,
  });

  const {exibirMessageBox} = useMessageBox();
  const {codigo} = useSessao();
  const {exibirCardLoader, esconderCardLoader, setCarregando} = useLoader();
  const {tratarErro} = useTratarErro();
  const {validarCadastroDespesa} = useValidacoes();
  const {atualizarSaldo} = useSaldo();

  const listarDespesasDeUmUsuario = () => {
    setCarregando(true);
    api.get("/despesa/".concat(codigo))
    .then((resp) => {
      setDespesas(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      setCarregando(false);
    })
  }

  useEffect(() => {
    listarDespesasDeUmUsuario();
  }, []);

  const preencherDespesa = (e) => {
    setDespesa({...despesa, [e.target.name] : e.target.value});
  }

  const salvarDespesa = (e) => {
    exibirCardLoader();
    api.post("/despesa", 
      {...despesa, 
        codigoUsuario: codigo
      })
    .then((resp) => {
      setDespesas(resp.data);
      esconderCardLoader();
      exibirMessageBox("", true, "Despesa salva com sucesso!", "Prosseguir");

      setDespesa({
        descricao: '',
        diaVencimento: 'escolha',
        valor: 0
      });
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const alterarStatusLancamentoDespesa = (codigo) => {
    exibirCardLoader();
    api.put("/despesa/alterarStatusLancamentoDespesa/".concat(codigo))
    .then(() => {
      setDespesas((despesasAtuais) =>
        despesasAtuais.map((despesa) =>
          despesa.codigo === codigo
            ? { ...despesa, jaFoiLancadaEsseMes: !despesa.jaFoiLancadaEsseMes }
            : despesa
        )
      );
      esconderCardLoader();
    })
    .catch((error) => {
       tratarErro(error);
    });
  };

   const tornarTodasDespesasPendentes = () => {
    exibirCardLoader();
    api.put("/despesa/tornarTodasDespesasPendentes/".concat(codigo))
    .then((resp) => {
      setDespesas(resp.data);
      esconderCardLoader();
    })
    .catch((error) => {
       tratarErro(error);
    });
  };

  const excluirDespesa = (codigo) => {
    exibirCardLoader();
    api.delete("/despesa/".concat(codigo))
    .then((resp) => {
      setDespesas(resp.data);
      esconderCardLoader();
      exibirMessageBox("", true, "Despesa excluida com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  const lancarDespesaNoDiaAtual = () => {
    exibirCardLoader();
    api.post("/despesa/lancarDespesa", despesa)
    .then((resp) => {
      esconderCardLoader();
      exibirMessageBox("/gestao", true, resp.data, "Prosseguir");
      atualizarSaldo();
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const enviarFormularioSalvarDespesa = (e) => {
    e.preventDefault();
    if(validarCadastroDespesa(despesa)) salvarDespesa();
  }

  return{despesas, despesa, setDespesa, preencherDespesa, enviarFormularioSalvarDespesa, alterarStatusLancamentoDespesa, tornarTodasDespesasPendentes, excluirDespesa, lancarDespesaNoDiaAtual}
}

export default useDespesas;