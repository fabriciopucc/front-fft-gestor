import styles from './Despesas.module.css';

import iconExcluir from '@/assets/icons/iconExcluir.png'
import Container from '@/components/layout/Container';
import HeaderVoltar from '@/components/layout/HeaderVoltar';
import DespesasForm from '@/components/forms/DespesasForm';

import useDespesas from '@/hooks/useDespesas';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import { useState } from 'react';
import LancarDespesaForm from '@/components/forms/LancarDespesaForm';
import QuantidadeEntidades from '@/components/utils/QuantidadeEntidades';
import useForm from '@/hooks/useForm';


export default function Despesas(){

  const {despesas, despesa, setDespesa, preencherDespesa, enviarFormularioSalvarDespesa, excluirDespesa, alterarStatusLancamentoDespesa, tornarTodasDespesasPendentes, lancarDespesaNoDiaAtual} = useDespesas();  
  const [exibirFormularioLancarDespesa, setExibirFormularioLancarDespesa] = useState(false);
  const [escolherDespesa, setEscolherDespesa] = useState(false);
  const {visibilidadeForm, exibirForm, esconderForm} = useForm();

  const [filtro, setFiltro] = useState("todas");

  const despesasFiltradas = despesas.filter((despesa) => {
     return filtro == "todas"
        ? true
        : filtro == "lancadasEsseMes"
          ? despesa.jaFoiLancadaEsseMes
          : !despesa.jaFoiLancadaEsseMes
  });

  const totalDespesas = despesasFiltradas.reduce((soma, objeto) => {
    return soma + objeto.valor;
  }, 0);

  let quantidadeDespesasPagas = despesas.filter((despesa) => despesa.jaFoiLancadaEsseMes).length;

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
         tituloPagina={"Despesas"}
      />

      <QuantidadeEntidades
        lista={despesas}
        limite={20}
        nomeEntidade={"despesas"}
        visibilidadeForm={visibilidadeForm}
        exibirForm={exibirForm}
      />

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
          <div className={styles.botoesAcoesDespesa}>
            <button
              disabled={!despesas.length}
              className={styles.botaoLancarDespesa+" "+[(!despesas.length) ? "desativado" : ""]}
              type='button'
              onClick={() => setEscolherDespesa(true)}
            >
              Lançar despesa
            </button>

            <button
              type='button'
              disabled={quantidadeDespesasPagas === 0}
              className={styles.botaoPendenciarDespesas+" "+[(quantidadeDespesasPagas === 0) && "desativado"]}
              onClick={tornarTodasDespesasPendentes}
            >
              Pendenciar todas
            </button>
          </div>
        ) : (<></>)
      }

      {
        despesas.length ? (
          <div className={styles.infoDespesas}>
            <span className={styles.totalDespesas}>Total: R$ {totalDespesas.toFixed(2)}</span>

            <select 
              value={filtro || "todas"}
              onChange={(e) => setFiltro(e.target.value)}  
            >
              <option value="todas">Todas</option>
              <option value="lancadasEsseMes">Pagas</option>
              <option value="naoLancadasEsseMes">Pendentes</option>
            </select>
          </div>
        ) : (<></>)
      }

      <ListaDeEntidade
        lista={despesasFiltradas}
        textoAlternativo={
          (filtro == "todas") ? "Ainda não foram cadastradas as despesas!" :
          (filtro == "lancadasEsseMes") ? "Sem despesas pagas no momento!" : 
          "Sem despesas pendentes no momento!"
        }
      >
        {
          despesasFiltradas.map((despesaDaLista) => (
            <div
              key={despesaDaLista.codigo}
              className={
                styles.despesa+" "+
                styles[(escolherDespesa) && "escolherDespesa"]+" "+
                styles[(despesaDaLista.codigo == despesa.codigo) && "selecionado"]
              }
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
                      src={iconExcluir} 
                      alt="Icone excluir" 
                      className={styles.botaoExcluir}
                      onClick={() => excluirDespesa(despesaDaLista.codigo)}
                    />
                  )
                }

                <div>
                  <span
                    className={
                      styles.molduraDia+" "+
                      styles[(despesaDaLista.codigo == despesa.codigo) && "neutra"]+" "+
                      styles[(despesaDaLista.jaFoiLancadaEsseMes) && "lancada"]
                    }
                    onClick={() => {
                        if(!escolherDespesa){
                          alterarStatusLancamentoDespesa(despesaDaLista.codigo)
                        }
                      }
                    }
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