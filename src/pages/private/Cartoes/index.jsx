import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";
import CartoesForm from "@/components/forms/CartoesForm";

import useCartoes from "@/hooks/useCartoes";
import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import QuantidadeEntidades from '@/components/utils/QuantidadeEntidades';
import useForm from '@/hooks/useForm';
import Cartao from '@/components/elements/Cartao';


export default function Cartoes(){

  const {cartao, preencherCartao, definirCorCartao, cartoes, enviarFormularioCadastrarCartao} = useCartoes();
  const {visibilidadeForm, exibirForm, esconderForm} = useForm();

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
        tituloPagina={"Cartões"}
      />

      {
        visibilidadeForm && (
          <CartoesForm
            cartao={cartao}
            preencherCartao={preencherCartao}
            definirCorCartao={definirCorCartao}
            enviarFormularioCadastrarCartao={enviarFormularioCadastrarCartao}
            esconderForm={esconderForm}
          />
        )
      }

      <QuantidadeEntidades
        lista={cartoes}
        limite={5}
        nomeEntidade={"cartões"}
        visibilidadeForm={visibilidadeForm}
        exibirForm={exibirForm}
      />

      <ListaDeEntidade
        lista={cartoes}
        textoAlternativo={"Você ainda não possui cartões cadastrados!"}
      >
        {
          cartoes.map((cartao) => (
            <Cartao
              key={cartao.codigo}
              cartao={cartao}
              preencherCartao={preencherCartao}
            />
          ))
        }
      </ListaDeEntidade>
    </Container>
  );
}