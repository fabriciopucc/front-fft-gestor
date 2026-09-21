import AlterarSenhaForm from "@/components/forms/AlterarSenhaForm";
import Container from "@/components/layout/Container";
import HeaderVoltar from "@/components/layout/HeaderVoltar";

export default function AlterarSenha(){

  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={"/meuPerfil"}
        tituloPagina={"Alterar senha"}
      />

      <AlterarSenhaForm/>
    </Container>
  );
}