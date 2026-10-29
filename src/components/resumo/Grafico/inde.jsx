import ContainerMolde from "@/components/utils/ContainerMolde";
import styles from "./Grafico.module.css";
import iconSetaParaBaixo from '@/assets/icons/iconSetaParaBaixo.svg';
import { Loader } from "@/components/utils";
import { useState } from "react";
import { data } from "react-router-dom";
import ListaDeEntidade from "@/components/lists/ListaDeEntidade";

export default function Grafico({dados = [], acoesDeUmDia, indiceDia, setIndiceDia, buscarAcoesDeUmDia}) {

  const maiorValor = Math.max(0, ...dados.map((item) => Number(item.gastoTotal) || 0));;

  const totalGastoGrafico = dados
  .reduce((soma, item) => soma + item.gastoTotal, 0);

  const totalGastoComDespesasGrafico = dados
  .reduce((soma, item) => soma + item.gastoComDespesas, 0);

  if(!dados.length){
    return <Loader/>
  }

  return (
    <ContainerMolde>
      <div className={styles.containerGrafico}>
        <div className={styles.margemContainerGrafico}>
          <span>
            <h1>Gastos nos últimos 7 dias</h1>
            <p>Saldo + cartão (não inclui receitas)</p>
          </span>

          <div className={styles.grafico}>
            {dados.map((item, index) => {
              const valorGastos = Number(item.gastoTotal) || 0;
              const valorDespesas = Number(item.gastoComDespesas) || 0;

              const alturaGastos =  maiorValor > 0 ? ((valorGastos - valorDespesas) / maiorValor) * 100 : 0;
              const alturaGastosComDespesas =  maiorValor > 0 ? (valorDespesas / maiorValor) * 100 : 0;

              const [ano, mes, dia] = item.data.split("-");

              return (
                <div className={styles.coluna} key={item.data}>
                  <span className={styles.valor}>
                    {valorGastos.toFixed(2)}
                  </span>

                  <div
                    className={styles.areaTorre}
                    role="img"
                    aria-label={`${dia}/${mes}/${ano}: ${valorGastos}`}
                  >
                    <div
                      className={styles.torre}
                      style={{ height: `${alturaGastos}%` }}
                    >
                      {((valorGastos - valorDespesas) > 0 && valorDespesas > 0) && (valorGastos - valorDespesas)}
                    </div>

                    <div
                      className={styles.torre2}
                      style={{ height: `${alturaGastosComDespesas}%` }}
                    >
                      {((valorGastos - valorDespesas) > 0 && valorDespesas > 0) && valorDespesas}
                    </div>
                  </div>

                  <span className={styles.data}>
                    {
                      index == 0 ? "hoje" :  dia+"/"+mes 
                    }
                  </span>

                  <img 
                    src={iconSetaParaBaixo} 
                    alt="Icone seta para baixo" 
                    className={
                      styles.iconeSetaParaBaixo+" "+
                      styles[(valorGastos == 0) && "iconeDesativado"]+" "+
                      styles[(indiceDia == index) && "iconeInvertido"]
                    }  
                    onClick={() => {
                        if(valorGastos > 0) buscarAcoesDeUmDia(index, item.data);
                      }
                    }
                  />
                </div>
              );
            })}
          </div>

          {
            indiceDia >= 0 && (
             <ListaDeEntidade
                lista={acoesDeUmDia}
              >
                <div className={styles.acoes}>
                  {
                    acoesDeUmDia.map((acao) => (
                      <div
                        key={acao.codigo} 
                        className={styles.acaoCategoria}
                      >
                        <div className={styles.infoAcaoCategoria}>
                          <p className={styles.dataAcaoCategoria}>
                            {acao.categoria}
                          </p>
                          
                          <p className={styles.horarioAcaoCategoria}>
                            {acao.horario} - {(acao.apelidoCartao) ? "Cartão ".concat(acao.apelidoCartao) : "Saldo em conta"}
                          </p>
                        </div>

                        <div className={styles.infoAcaoCategoria}>
                          <p className={styles.valorAcaoCategoria}>R$ {acao.valor.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </ListaDeEntidade>
            )
          }

          <div className={styles.metricasGrafico}>
            <div>
              <span className={styles.tipoDeGasto}>
                <div className={styles.indicador}></div>
                <p>Despesas: R$ {totalGastoComDespesasGrafico.toFixed(2)}</p>
              </span>

              <span className={styles.tipoDeGasto}>
                <div className={styles.indicador}></div>
                <p>Gastos: R$ {(totalGastoGrafico - totalGastoComDespesasGrafico).toFixed(2)}</p>
              </span>
            </div>

            <div>
              <h1>R$ {totalGastoGrafico.toFixed(2)}</h1>
              <p>Total</p>
            </div>
          </div>
        </div>
      </div>
    </ContainerMolde>
  );
}