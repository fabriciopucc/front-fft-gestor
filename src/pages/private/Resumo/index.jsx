import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";

import Saldo from '@/components/elements/Saldo';
import useResumo from '@/hooks/useResumo';
import { Loader } from '@/components/utils';

import Grafico from '@/components/resumo/Grafico/inde';
import Despesas from '@/components/resumo/Despesas';
import Cartoes from '@/components/resumo/Cartoes';
import ListaGastosPorCategoriaNoCartao from "@/components/resumo/ListaDeGastosPorCategoriaNoCartao";
import ListaGastosPorCategoriaNoSaldo from "@/components/resumo/ListaDeGastosPorCategoriaNoSaldo";

export default function Resumo(){

  const {
    alterarFiltroPeriodo, filtroPeriodo,
    resumo,
    acoesPorCategoria, exibirAcoes,
    buscarAcoesPorCategoriaDeUmUsuario,
    acoesDeUmDia, indiceDia, buscarAcoesDeUmDia
  } = useResumo();

  const listaGastosPorCategoriaNoSaldo = [
    ...((filtroPeriodo.comSaldo == "semana")
      ? resumo?.gastosPorCategoriasNoSaldoNosUltimosSeteDias ?? []
      : resumo?.gastosPorCategoriasNoSaldoNosUltimosTrintaDias ?? [])
  ]
  .sort((a, b) => Math.abs(b.valorGasto) - Math.abs(a.valorGasto))
  .filter((categoria) => categoria.valorGasto !== 0);

  
  const listaGastosPorCategoriaNoCartao = [
    ...((filtroPeriodo.comCartao == "semana")
      ? resumo?.gastosPorCategoriasNoCartaoNosUltimosSeteDias ?? []
      : resumo?.gastosPorCategoriasNoCartaoNosUltimosTrintaDias ?? [])
  ]
  .sort((a, b) => Math.abs(b.valorGasto) - Math.abs(a.valorGasto))
  .filter((categoria) => categoria.valorGasto !== 0);

  const listaCartoes = resumo?.cartoesSimplificados ?? [];

  const gastosNosUltimos7Dias = resumo?.gastosNosUltimos7Dias ?? [];

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
        tituloPagina={"Resumo"}
      />

      {
        resumo ? (
          <>
            <Saldo/>

            <Grafico
              dados={gastosNosUltimos7Dias}
              acoesDeUmDia={acoesDeUmDia}
              indiceDia={indiceDia}
              buscarAcoesDeUmDia={buscarAcoesDeUmDia}
            />

            <ListaGastosPorCategoriaNoSaldo
              listaGastosPorCategoriaNoSaldo={listaGastosPorCategoriaNoSaldo}
              exibirAcoes={exibirAcoes}
              acoesPorCategoria={acoesPorCategoria}
              filtroPeriodo={filtroPeriodo}
              alterarFiltroPeriodo={alterarFiltroPeriodo}
              buscarAcoesPorCategoriaDeUmUsuario={buscarAcoesPorCategoriaDeUmUsuario}
            />

            <ListaGastosPorCategoriaNoCartao
              listaGastosPorCategoriaNoCartao={listaGastosPorCategoriaNoCartao}
              exibirAcoes={exibirAcoes}
              acoesPorCategoria={acoesPorCategoria}
              filtroPeriodo={filtroPeriodo}
              alterarFiltroPeriodo={alterarFiltroPeriodo}
              buscarAcoesPorCategoriaDeUmUsuario={buscarAcoesPorCategoriaDeUmUsuario}
            />

            

            <Despesas
              totalDespesas={resumo.totalDespesas}
              totalDespesasLancadas={resumo.totalDespesasLancadas}
            />

            <Cartoes
              listaCartoes={listaCartoes}
            />
          </>
        ) : (
          <Loader/>
        )
      }

    </Container>
  )
}