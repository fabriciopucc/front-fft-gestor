import styles from './Gestao.module.css';

import Container from '@/components/layout/Container';
import HeaderVoltar from '@/components/layout/HeaderVoltar';
import ListaDeAcoes from '@/components/lists/ListaDeAcoes';

import useSaldo from '@/hooks/useSaldo';
import useDias from '@/hooks/UseDias';

import converterDataAmericanaEmBrasileira from '@/utils/converterDataAmericanaEmBrasileira';
import BotaoLink from '@/components/utils/BotaoLink';
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import Saldo from '@/components/elements/Saldo';
import { useState } from 'react';
import useAcao from '@/hooks/useAcao';
import BotaoPaginacao from '@/components/utils/BotaoPaginacao';
import ContainerMolde from '@/components/utils/ContainerMolde';


export default function Gestao(){

  const {data, setData, criarDia, dias, setDias, paginacao, avancarPagina, retrocederPagina} = useDias();
  const {saldo} = useSaldo();
  const {desfazerAcao, codigoAcao, setCodigoAcao} = useAcao();

  const meses =  ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const diasDaSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
        tituloPagina={"Gestão"}
      />

      <Saldo/>

      <ContainerMolde>
        <input 
          type="date" 
          onChange={(e) => setData(e.target.value)}
          value={data || ''}
          className={styles.definirData}
        />

        <button 
          type='button'
          onClick={criarDia}
          className={styles.botaoCriarDia+" "+[(saldo.saldoInicial == 0 || !data) && "desativado"]}
          disabled={(saldo.saldoInicial == 0 || !data)}        
        >
          {data ? "Criar dia" : "Selecione o dia"}
        </button>

        {
          dias.length ? (
            <BotaoPaginacao
              paginacao={paginacao}
              avancar={avancarPagina}
              voltar={retrocederPagina}
            />
          ) : <></>
        }

        <ListaDeEntidade
          lista={dias}
          textoAlternativo={"Ainda não existem dias para esse usuário!"}
        >
          {
            dias.map((dia) => (
              <div
                key={dia.codigo}  
                className={styles.dia}
              >
                <div className={styles.margemDia}>
                  <span
                    className={styles.tituloDia}
                  >
                    <h1>
                      {
                        dia.data.split("-")[2] 
                        +"  "+
                        meses[parseInt(dia.data.split("-")[1])-1] 
                        +"  "+
                        dia.data.split("-")[0]
                      }
                    </h1>

                    <p>
                      {diasDaSemana[new Date(dia.data).getDay()]}
                    </p>
                  </span>
                  
                  <ListaDeAcoes
                    dia={dia}
                    codigoAcao={codigoAcao}
                    setCodigoAcao={setCodigoAcao}
                    desfazerAcao={desfazerAcao}
                    setDias={setDias}
                  />
                </div>
              </div>
            ))
          }
        </ListaDeEntidade>
      </ContainerMolde>
    </Container>
  )
}