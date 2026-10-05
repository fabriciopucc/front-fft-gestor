import iconSeta from '@/assets/icons/iconSeta.svg';

import styles from './ListaDeAcoes.module.css';
import { useState } from 'react';
import ListaDeEntidade from '../ListaDeEntidade';
import categoriasIcons from '@/constants/categoriasIcons';
import BotaoLink from '@/components/utils/BotaoLink';
import BarraProgresso from '@/components/utils/BarraProgresso';

export default function ListaDeAcoes({dia,  codigoAcao, setCodigoAcao, desfazerAcao, setDias}){


  const [exibirConteudo, setExibirConteudo] = useState("saldoEmConta");
  const [exibirDesfazerAcao, setExibirDesfazerAcao] = useState(false);

  let acoesDeSaldo = dia.acoes.filter((acao) => ['saida', 'entrada'].includes(acao.tipoTransacao));
  let acoesDeCartao = dia.acoes.filter((acao) => ['cartaoCredito', 'quitacaoCartao'].includes(acao.tipoTransacao));

  return(
    <>
      <div className={styles.escolherExibirConteudo}>
        <div
          onClick={() => setExibirConteudo("saldoEmConta")}
          className={styles.seletorConteudo+" "+[exibirConteudo === "saldoEmConta" && styles.opcaoSelecionada]}        
          >
          Saldo
        </div>

        <div
          onClick={() => setExibirConteudo("cartaoCredito")}
          className={styles.seletorConteudo+" "+[exibirConteudo === "cartaoCredito" && styles.opcaoSelecionada]}        
        >
          Cartão
        </div>
      </div>

      {
        exibirConteudo == "saldoEmConta" ? (
          <ListaDeEntidade
            classe={"comMargem"}
            lista={acoesDeSaldo}
            textoAlternativo={"Ainda não há ações de saldo em conta neste dia!"}
          >
            <div className={styles.metricas}>
              <p>Variação do dia</p>
              <h1  
                className={styles.valorBalanco+" "+[((dia.saldoAtual - dia.saldoInicial) > 0) ? "valorPositivo" : ((dia.saldoAtual - dia.saldoInicial) < 0) && "valorNegativo"]}
              >
                {((dia.saldoAtual - dia.saldoInicial) > 0) ? "+ " : ((dia.saldoAtual - dia.saldoInicial) < 0) && "- "}
                R$ {parseFloat(Math.abs(dia.saldoAtual - dia.saldoInicial)).toFixed(2)}
              </h1>

              <div className={styles.linhaMetricas}>
                <p>R$ {dia.saldoInicial.toFixed(2)}</p>
                  
                <img 
                  src={iconSeta} 
                  alt="iconSeta" 
                />

                <p>R$ {dia.saldoAtual.toFixed(2)}</p>
              </div>
            </div>
          
            <div className={styles.containerAcoes}>
              {
                acoesDeSaldo.map((acao) => (
                  <div
                    key={acao.codigo}
                    className={styles.acao+" "+styles[(codigoAcao == acao.codigo) && "acaoSelecionada"]}
                    onClick={() => {
                        if(exibirDesfazerAcao) setCodigoAcao(acao.codigo)
                      }
                    }
                  >
                    <div className={styles.molduraIcone}>
                      <img 
                        src={(categoriasIcons[acao.indiceIcon - 1] ?? categoriasIcons[0]).src}
                        alt="Icon" 
                      />
                    </div>

                    <div className={styles.dadosAcao}>
                      <span>
                        <p>{acao.categoria}</p>
                        <p>{acao.horario}</p>
                      </span>

                      <p className={(acao.tipoTransacao == "saida") ? "valorNegativo" : "valorPositivo"}>
                        {(acao.tipoTransacao == "saida") ? "- " :  "+ "}
                        R$ {Math.abs((acao.valor)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </ListaDeEntidade>
        ) : (
          <ListaDeEntidade
            classe={"comMargem"}
            lista={acoesDeCartao}
            textoAlternativo={"Ainda não há ações de cartão neste dia!"}
          >
            {
              dia.historicoUsoCartoes.map((metricasCartao) => (
                <div
                  key={metricasCartao.codigo}
                  className={styles.metricasCartao}
                >
                  <div className={styles.dadosMetricas}>
                    <p>
                      {metricasCartao.apelidoCartao}
                    </p>
                    
                    <p className={['valorNegativo']}>
                      {(metricasCartao.limiteUsadoInicial - metricasCartao.limiteUsadoAtual).toFixed(2)} hoje
                    </p>
                  </div>

                  <BarraProgresso
                    inicial={metricasCartao.limiteUsadoInicial}
                    atual={metricasCartao.limiteUsadoAtual}
                    maximo={metricasCartao.limiteTotal}
                  />

                  <div className={styles.dadosMetricas}>
                    <p>
                      R$ {metricasCartao.limiteUsadoInicial.toFixed(2)}
                    </p>
                    
                    <p>
                      R$ {metricasCartao.limiteUsadoAtual.toFixed(2)} de {metricasCartao.limiteTotal}
                    </p>
                  </div>
                </div>
              ))
            }

            <div className={styles.containerAcoes}>
              {
              acoesDeCartao.map((acao) => (
                <div
                  key={acao.codigo}
                  className={styles.acao+" "+styles[(codigoAcao == acao.codigo) && "acaoSelecionada"]}
                  onClick={() => {
                    if(exibirDesfazerAcao) setCodigoAcao(acao.codigo)
                    }
                  }
                >
                  <div className={styles.molduraIcone}>
                    <img 
                      src={(categoriasIcons[acao.indiceIcon - 1] ?? categoriasIcons[0]).src}
                      alt="Icon" 
                    />
                  </div>

                  <div className={styles.dadosAcao}>
                    <span>
                      <p>{acao.categoria}</p>
                      <p>{acao.horario} {acao.horario}</p>
                    </span>

                    <p>
                      R$ {acao.valor.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            }
            </div>
          </ListaDeEntidade>
        )  
      }

       <div
          className={styles.botoesAcoes}
        >
          {
            exibirDesfazerAcao ? (
              <>
                <button
                  type='button'
                  onClick={() => desfazerAcao(codigoAcao, setDias)}
                  disabled={!codigoAcao}
                  className={(codigoAcao) ? "botaoPositivo" : "desativado"}
                >
                  {(codigoAcao) ? "Confirmar" : "Selecione"}
                </button>

                <button
                  type='button'
                  onClick={() => {
                    setExibirDesfazerAcao(false);
                    setCodigoAcao("");
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <BotaoLink
                  destino={"/adicionarAcao/".concat(dia.codigo)}
                  texto={"Adicionar"}
                  classeAdcional={"reduzido"}
                />

                {
                  (exibirConteudo == "saldoEmConta" && acoesDeSaldo.length) || 
                  (exibirConteudo == "cartaoCredito" && acoesDeCartao.length) 
                  ? (
                    <button
                      type='button'
                      className={styles.botaoDesfazer}
                      onClick={() => setExibirDesfazerAcao(true)}
                    >
                      Desfazer
                    </button>
                  ) : <></>
                }
              </>
            )
          }
        </div>
    </>
  )
}