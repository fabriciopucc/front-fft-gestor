import HeaderVoltar from "@/components/layout/HeaderVoltar";
import Container from "@/components/layout/Container";
import ConfiguracaoForm from "@/components/forms/ConfirguracaoForm";
import Saldo from "@/components/elements/Saldo";

export default function Configuracao(){

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
        tituloPagina={"Configuração"}
      />
      
      <Saldo/>

      <ConfiguracaoForm/>
    </Container>
  )
}