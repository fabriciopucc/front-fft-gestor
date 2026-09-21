import Container from "../../../components/layout/Container";
import HeaderVoltar from '@/components/layout/HeaderVoltar';
import AdicionarAcaoForm from '@/components/forms/AdicionarAcaoForm';


export default function AdiconarAcao(){

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/gestao"}
        tituloPagina={"Adicionar ação"}
      />

      <AdicionarAcaoForm

      />
    </Container>
  )
}