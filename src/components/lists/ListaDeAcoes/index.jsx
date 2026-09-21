import iconSeta from '@/assets/icons/iconSeta.png';

import styles from './ListaDeAcoes.module.css';
import { useState } from 'react';
import ListaDeEntidade from '../ListaDeEntidade';
import categoriasIcons from '@/constants/categoriasIcons';

export default function ListaDeAcoes({dia,  codigoAcao, setCodigoAcao, desfazerAcao, setDias}){


  const [exibirConteudo, setExibirConteudo] = useState("saldoEmConta");
  const [exibirDesfazerAcao, setExibirDesfazerAcao] = useState(false);

  let acoesDeSaldo = dia.acoes.filter((acao) => ['saida', 'entrada'].includes(acao.tipoTransacao));
  let acoesDeCartao = dia.acoes.filter((acao) => ['cartaoCredito', 'quitacaoCartao'].includes(acao.tipoTransacao));

  return(
    <>
      <div className={styles.escolherExibirConteudo}>
        <p 
          onClick={() => setExibirConteudo("saldoEmConta")}
          className={styles[(exibirConteudo == "saldoEmConta") && "selecionado"]}
        >
          Saldo
        </p>

        <p 
          onClick={() => setExibirConteudo("cartaoCredito")}
          className={styles[(exibirConteudo == "cartaoCredito") && "selecionado"]}
        >
          Cartão
        </p>
      </div>

      {
        exibirConteudo == "saldoEmConta" ? (
          <ListaDeEntidade
            classe={"comMargem"}
            lista={acoesDeSaldo}
            textoAlternativo={"Ainda não há ações de saldo em conta neste dia!"}
          >
            {
              acoesDeSaldo.map((acao) => (
                <div
                  className={styles.acao}
                  key={acao.codigo}
                >
                  <div className={styles.linhaAcao+" "+styles
                    [
                      (["saida", "despesa"].includes(acao.tipoTransacao)) ? "acaoNegativa" : 
                      (acao.tipoTransacao == "entrada") &&  "acaoPositiva"
                    ]+" "+styles
                    [
                      (codigoAcao == acao.codigo) && "acaoSelecionada" 
                    ]}
                    onClick={() => {
                      if(exibirDesfazerAcao) setCodigoAcao(acao.codigo)
                    }}
                  >
                    <div>
                      <img 
                        src={categoriasIcons[acao.indiceIcon - 1]?.src} 
                        alt="Icon" 
                      />
                    </div>

                    <div>
                      <p>
                        {acao.categoria}
                      </p>
                    </div>

                    <div>
                      <strong>
                        R$ {parseFloat(acao.valor).toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <p>
                        {acao.horario}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }

            <div className={styles.metricas}>
              <h1  
                className={styles.valorBalanco+" "+styles[((dia.saldoAtual - dia.saldoInicial) > 0) ? "balancoPositivo" : ((dia.saldoAtual - dia.saldoInicial) < 0) && "balancoNegativo"]}
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

            <div
              className={styles.botoesAcoes}
            >
              {
                exibirDesfazerAcao ? (
                  <>
                    <button
                      type='button'
                      onClick={() => {
                        setExibirDesfazerAcao(false);
                        setCodigoAcao("");
                      }}
                    >
                      Cancelar
                    </button>
                    
                    <button
                      type='button'
                      onClick={() => desfazerAcao(codigoAcao, setDias)}
                      disabled={!codigoAcao}
                      className={(codigoAcao) ? "botaoPositivo" : "desativado"}
                    >
                      {(codigoAcao) ? "Confirmar" : "Selecione"}
                    </button>
                  </>
                ) : (
                  <button
                    type='button'
                    onClick={() => setExibirDesfazerAcao(true)}
                  >
                    Desfazer ação
                  </button>
                )
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
              acoesDeCartao.map((acao) => (
                <div
                  className={styles.acao}
                  key={acao.codigo}
                >
                  <div 
                    className={styles.linhaAcao+" "+styles
                    [
                      (acao.tipoTransacao == "cartaoCredito") ? "acaoNegativa" :
                      (acao.tipoTransacao == "quitacaoCartao") && "acaoPositiva"
                    ]+" "+styles
                    [
                      (codigoAcao == acao.codigo) && "acaoSelecionada" 
                    ]}
                    onClick={() => {
                      if(exibirDesfazerAcao) setCodigoAcao(acao.codigo)
                    }}
                  >
                    <div>
                      <strong>
                        {acao.apelidoCartao}
                      </strong>
                    </div>

                    <div>
                      <img 
                        src={categoriasIcons[acao.indiceIcon - 1]?.src} 
                        alt="Icon" 
                      />
                    </div>

                    <div>
                      <p>
                        {acao.categoria}
                      </p>
                    </div>

                    <div>
                      <strong>
                        R$ {parseFloat(acao.valor).toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <p>
                        {acao.horario}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }

            <div
              className={styles.containerMetricasCartao}
            >
              {
                dia.historicoUsoCartoes.map((metricasCartao) => (
                  <div 
                    key={metricasCartao.codigo}
                    className={styles.linhaMetricasCartao}
                  >
                    <p
                      className={styles.apelidoCartao}
                    >
                      {metricasCartao.apelidoCartao}
                    </p>
                    
                    <div
                      className={styles.metricasCartao}
                    >
                      <div
                        className={styles.comparacaoLimites}
                      >
                        <p
                          className={styles.limiteInicial}
                        >
                          R$ {metricasCartao.limiteUsadoInicial.toFixed(2)}/{metricasCartao.limiteTotal.toFixed(2)}
                        </p>
                        
                        <img 
                          src={iconSeta} 
                          alt="iconSeta" 
                        />

                        <p
                          className={styles.limiteAtual}
                        >
                          R$ {metricasCartao.limiteUsadoAtual.toFixed(2)}/{metricasCartao.limiteTotal.toFixed(2)}
                        </p>
                      </div>

                      <p  
                        className={styles.valorBalancoCartao+" "+styles[((metricasCartao.limiteUsadoInicial - metricasCartao.limiteUsadoAtual) > 0) ? "balancoPositivo" : ((metricasCartao.limiteUsadoInicial - metricasCartao.limiteUsadoAtual) < 0) && "balancoNegativo"]}
                      >
                        {((metricasCartao.limiteUsadoInicial - metricasCartao.limiteUsadoAtual) > 0) ? "+ " : ((metricasCartao.limiteUsadoInicial - metricasCartao.limiteUsadoAtual) < 0) && "- "}
                        R$ {parseFloat(Math.abs(metricasCartao.limiteUsadoInicial - metricasCartao.limiteUsadoAtual)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>

            <div
              className={styles.botoesAcoes}
            >
              {
                exibirDesfazerAcao ? (
                  <>
                    <button
                      type='button'
                      onClick={() => {
                        setExibirDesfazerAcao(false);
                        setCodigoAcao("");
                      }}
                    >
                      Cancelar
                    </button>
                    
                    <button
                      type='button'
                      onClick={() => desfazerAcao(codigoAcao, setDias)}
                      disabled={!codigoAcao}
                      className={(codigoAcao) ? "botaoPositivo" : "desativado"}
                    >
                      {(codigoAcao) ? "Confirmar" : "Selecione"}
                    </button>
                  </>
                ) : (
                  <button
                    type='button'
                    onClick={() => setExibirDesfazerAcao(true)}
                  >
                    Desfazer ação
                  </button>
                )
              }
            </div>
          </ListaDeEntidade>
        )
      }
    </>
  )
}