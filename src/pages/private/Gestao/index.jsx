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


export default function Gestao(){

  const {data, setData, criarDia, dias, setDias} = useDias();
  const [codigoAcao, setCodigoAcao] = useState();
  const {saldo} = useSaldo();
  const {desfazerAcao} = useAcao();

  const meses =  ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
        tituloPagina={"Gestão"}
      />

      <Saldo/>

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
                <h1
                  className={styles.tituloDia}
                >
                  {
                    dia.data.split("-")[2] 
                    +"  "+
                    meses[parseInt(dia.data.split("-")[1])-1] 
                    +"  "+
                    dia.data.split("-")[0]
                  }
                </h1>
                
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
    </Container>
  )
}