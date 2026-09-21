import styles from './Despesas.module.css';

import iconFechar from '@/assets/icons/close.png'
import Container from '@/components/layout/Container';
import HeaderVoltar from '@/components/layout/HeaderVoltar';
import DespesasForm from '@/components/forms/DespesasForm';

import useDespesas from '@/hooks/useDespesas';
import useLoader from '@/hooks/useLoader';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import { useState } from 'react';
import LancarDespesaForm from '@/components/forms/LancarDespesaForm';
import QuantidadeEntidades from '@/components/utils/QuantidadeEntidades';
import useForm from '@/hooks/useForm';


export default function Despesas(){

  const {despesas, despesa, setDespesa, preencherDespesa, enviarFormularioSalvarDespesa, excluirDespesa, lancarDespesaNoDiaAtual} = useDespesas();  const {visibilidadeLoader} = useLoader();
  const [exibirFormularioLancarDespesa, setExibirFormularioLancarDespesa] = useState(false);
  const [escolherDespesa, setEscolherDespesa] = useState(false);
  const {visibilidadeForm, exibirForm, esconderForm} = useForm();

  return(
    <Container centralizar={true}>
      {
        exibirFormularioLancarDespesa && (
          <LancarDespesaForm
            despesa={despesa}
            setDespesa={setDespesa}
            preencherDespesa={preencherDespesa}
            setExibirFormularioLancarDespesa={setExibirFormularioLancarDespesa}
            lancarDespesaNoDiaAtual={lancarDespesaNoDiaAtual}
          />
        )
      }

      <HeaderVoltar
        destino={"/menu"}
         tituloPagina={"Despesas"}
      />

      {
        visibilidadeForm && (
          <DespesasForm
            despesa={despesa}
            preencherDespesa={preencherDespesa}
            enviarFormularioSalvarDespesa={enviarFormularioSalvarDespesa}
            esconderForm={esconderForm}
          />
        )
      }

      <QuantidadeEntidades
        lista={despesas}
        limite={20}
        nomeEntidade={"despesas"}
        visibilidadeForm={visibilidadeForm}
        exibirForm={exibirForm}
      />

      {
        (escolherDespesa && !visibilidadeForm) ? (
          <div
            className={styles.botoesLancarDespesa}
          >
            <button
              onClick={() => {
                setDespesa({codigo: ''});
                setEscolherDespesa(false);
              }}
            >
              Cancelar
            </button>

            <button
              disabled={(!despesa.codigo)}
              className={(despesa.codigo) ? "botaoPositivo" : "desativado"}
              onClick={() => setExibirFormularioLancarDespesa(true)}
            >
              {despesa.codigo ? "Confirmar" : "Selecione"}
            </button>
          </div>
        ) : (despesas.length && !visibilidadeForm) ? (
          <button
            disabled={!despesas.length}
            className={styles.botaoLancarDespesa+" "+[(!despesas.length) ? "desativado" : ""]}
            type='button'
            onClick={() => setEscolherDespesa(true)}
          >
            Lançar despesa
          </button>
        ) : (<></>)
      }

      <ListaDeEntidade
        lista={despesas}
        textoAlternativo={"Ainda não foram cadastradas as despesas!"}
      >
        {
          despesas.map((despesaDaLista) => (
            <div
              key={despesaDaLista.codigo}
              className={styles.despesa+" "+styles[(despesaDaLista.codigo == despesa.codigo) && "selecionado"]}
              onClick={() => {
                if(escolherDespesa){
                  setDespesa({
                    formaPagamento: 'escolha',
                    codigo: despesaDaLista.codigo
                  });
                }
              }}
            >
              <div
                className={styles.margemDespesa}
              >
                {
                  (!escolherDespesa) && (
                     <img 
                      src={iconFechar} 
                      alt="Icone fechar" 
                      className={styles.botaoFechar}
                      onClick={() => excluirDespesa(despesaDaLista.codigo)}
                    />
                  )
                }

                <div>
                  <span
                    className={styles.molduraDia}
                  >
                    <p>
                      {(despesaDaLista.diaVencimento < 10) && "0"}
                      {despesaDaLista.diaVencimento}
                    </p>
                  </span>
                </div>

                <div>
                  <p>
                    {despesaDaLista.descricao}
                  </p>
                </div>

                <div>
                  <p>
                    R$ {parseFloat(despesaDaLista.valor).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </ListaDeEntidade>
    </Container>
  )
}